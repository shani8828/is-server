const Event = require("../models/Event");
const KnownPerson = require("../models/KnownPerson");
const UnknownPerson = require("../models/UnknownPerson");
const Counter = require("../models/Counter");
const { isDuplicate } = require("../services/state.service");
const { getCurrentSessionId } = require("../services/session.service");

const ingestEvent = async (req, res) => {
  try {
    const sessionId = getCurrentSessionId();
    const io = req.app.get("io");

    // --- CONFIRMATION LOG START ---
    // This will print the incoming data from the other laptop to your console
    console.log("-----------------------------------------");
    console.log(`[${new Date().toISOString()}] New Event Received:`);
    console.log(JSON.stringify(req.body, null, 2));
    console.log("-----------------------------------------");
    // --- CONFIRMATION LOG END ---

    const {
      event_id,
      timestamp,
      camera_id,
      track_id,
      is_known,
      person_id,
      confidence,
    } = req.body;

    // 1. Check for duplicates
    if (isDuplicate(track_id)) {
      console.log(`Duplicate track detected: ${track_id}. Skipping...`);
      return res.status(200).json({ message: "Duplicate track ignored" });
    }

    // 2. Save event with Session ID
    const newEvent = await Event.create({
      session_id: sessionId,
      event_id,
      timestamp,
      camera_id,
      track_id,
      is_known,
      person_id,
      confidence,
    });
    
    // Emit event with session info
    io.emit("new_event", newEvent);

    // 3. Handle Counter for current session
    let counter = await Counter.findOne({ session_id: sessionId });
    if (!counter) {
      counter = await Counter.create({ 
        session_id: sessionId, 
        knownCount: 0, 
        unknownCount: 0 
      });
    }

    let isNewPerson = false;

    // 4. Update Person Logic
    if (is_known) {
      const existing = await KnownPerson.findOne({ person_id });
      if (!existing) {
        isNewPerson = true;
        counter.knownCount += 1;
      }

      await KnownPerson.findOneAndUpdate(
        { person_id },
        {
          $set: { last_seen: new Date() },
          $addToSet: { cameras_seen: camera_id },
        },
        { upsert: true }
      );
    } else {
      const existing = await UnknownPerson.findOne({ temp_id: person_id });
      if (!existing) {
        isNewPerson = true;
        counter.unknownCount += 1;
      }

      await UnknownPerson.findOneAndUpdate(
        { temp_id: person_id },
        {
          $set: { last_seen: new Date() },
          $setOnInsert: { first_seen: new Date() },
          $addToSet: { cameras_seen: camera_id },
        },
        { upsert: true }
      );
    }

    // 5. Save counter and emit
    if (isNewPerson) {
      await counter.save();
      console.log(`New person added to session ${sessionId}. Total Known: ${counter.knownCount}, Unknown: ${counter.unknownCount}`);
    }

    io.emit("countUpdate", {
      session_id: sessionId,
      known: counter.knownCount,
      unknown: counter.unknownCount,
      total: counter.knownCount + counter.unknownCount,
    });

    return res.status(200).json({
      message: "Event processed successfully",
      isNewPerson,
      sessionId
    });

  } catch (err) {
    console.error("!!! Ingest Error !!!", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { ingestEvent };