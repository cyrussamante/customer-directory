// eventData.js
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.resolve(process.env.DATA_PATH)


async function loadFile() {
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    return parsedData;
}

async function saveFile(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile(dataPath, content, 'utf8');
}

function formatEventDetails(event) {
    const formatted = { ...event };
    if ('capacity' in formatted) formatted.capacity = Number(formatted.capacity);
    return formatted;
}

async function getAllEvents () {
    const db = await loadFile();
    return db.events;
}

async function getEventById(id) {
    const db = await loadFile();
    return db.events.find(x => String(x.id) === String(id)) || null;
}

async function createEvent(event) {
    if (!event || !event.id) {
        throw new Error('createEvent: missing id (controller must assign UUID)');
    }

    const db = await loadFile();

    const formatted = formatEventDetails(event);
    db.events.push(formatted);
    await saveFile(db);
    return formatted;
}

async function updateEvent(id, update) {
    const db = await loadFile();
    const index = db.events.findIndex(x => String(x.id) === String(id));
    if (index === -1) throw new Error("Unable to find event");

    const formatted = formatEventDetails(update);
    db.events[index] = {
        ...db.events[index],
        ...formatted,
        id: db.events[index].id, //Keep the id as it was before
    };

    await saveFile(db);
    return db.events[index];
}

async function deleteEvent(id) {
    const db = await loadFile();

    const event = db.events.find(c => String(c.id) === String(id));
    if (!event) return false;

    // Delete associated image if not default
    if (event.imageUrl && event.imageUrl !== '/images/default_image.png') {
        try {
            const imgFile = path.join(path.join(__dirname, 'images'), path.basename(event.imageUrl));
            await fs.unlink(imgFile);
        } catch (err) {
            console.warn(`Could not delete image file for ${id}:`, err.message);
        }
    }

    // Remove event from the array
    db.events = db.events.filter(c => String(c.id) !== String(id));
    await saveFile(db);

    return true;
}

module.exports = {
    getAllEvents, getEventById, createEvent, updateEvent, deleteEvent,  
};
