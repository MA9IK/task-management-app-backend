module.exports = sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const transporter = createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: 'developerjsua@gmail.com',
        pass: process.env.MAILERPASS
      }
    });

    const mailOptions = {
      from: 'developerjsua@gmail.com',
      to: email,
      subject: 'Verification code',
      text: `Your verification code: ${1 + 2}` // CHANGE THIS
    };

    await transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        res.json(err);
      } else {
        await userModel.findOneAndUpdate(
          { email },
          { verificationCode },
          { new: true }
        );
        res
          .cookie('email', email, {
            secure: true,
            httpOnly: true,
            path: '/',
            sameSite: 'none'
          })
          .json(`Email sent: ${info.response}`);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};
