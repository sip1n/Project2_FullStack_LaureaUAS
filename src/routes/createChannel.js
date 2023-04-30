// CREATE CHANNEL
router.post('/channels', async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.userId;

    // Create new channel
    const newChannel = new Channel({
      name,
      description,
      created_by: createdBy,
      members: [createdBy]
    });

    // Save new channel to database
    await newChannel.save();

    // Return success response
    res.status(201).json({ message: 'Channel created', channel: newChannel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});