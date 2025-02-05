import { Event } from '../models/eventModel';
export const getEvents = async (_req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};
export const getEventsById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};
export const addEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating event', error });
    }
};
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};
