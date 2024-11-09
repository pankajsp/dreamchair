const User = require("../models/user");
const Wallet = require("../models/wallet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Referral = require("../models/referral");
const ReferralBonus = require("../models/referralBonus");
const MLA = require("../models/mla");
const Groups = require("../models/groups");
const Contest = require("../models/Contest");
const District = require("../models/district");
const Constituency = require("../models/constituency");
const CabinetMember = require("../models/cabinetMembers");
const CabinetContest = require("../models/cabinetContest");
const { default: axios } = require("axios");
const cheerio = require("cheerio");
const WalletTransaction = require("../models/walletTransaction");

const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "";
  for (let i = 0; i < 7; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return referralCode;
};

const ensureUniqueReferralCode = async () => {
  let referralCode;
  let user;
  do {
    referralCode = generateReferralCode();
    user = await User.findOne({ referral: referralCode });
  } while (user);
  return referralCode;
};

exports.loginRegister = async (req, res) => {
  try {
    const { emailOrNumber, inviteCode } = req.body;

    if (!emailOrNumber) {
      return res.status(400).json({ message: "Number is required" });
    }

    let user = await User.findOne({ number: emailOrNumber });

    if (!user) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const fiveDigitOtp = otp.toString().slice(0, 5);

      const referralCode = await ensureUniqueReferralCode();

      user = new User({
        number: emailOrNumber,
        otp: fiveDigitOtp,
        referral: referralCode,
      });

      // const apiEndPoint = `http://bulksms.saakshisoftware.in/api/mt/SendSMS?user=demoss&password=123123&senderid=SAKSHI&channel=trans&DCS=0&flashsms=0&number=${emailOrNumber.trim()}&text=Your OTP for Registration is ${otp}&route=04&DLTTemplateId=1407161562067880701&PEID=1701158097100985174`;
      const apiEndPoint = `http://bulksms.saakshisoftware.in/api/mt/SendSMS?user=PNKV&password=9852520&senderid=SCOSER&channel=trans&DCS=0&flashsms=0&number=${emailOrNumber}&text=Dear Sir/Ma'am, Your One Time Password (OTP) is ${fiveDigitOtp} .For mobile number verification in registration Please use this OTP to complete the transaction. Keep this OTP confidential and secure. Thanks %26 Regards, Team SAI COMPUTER ONLINE SERVICES    &route=04&DLTTemplateId=1707173019094159327&PEID=1701172966543474612`;

      const savedUser = await user.save();

      const referralUser = await User.findOne({ referral: inviteCode });
      if (referralUser) {
        const referral = new Referral({
          refferedBy: referralUser._id,
          refferedTo: user._id,
        });

        await referral.save();

        const referralBonus = await ReferralBonus.find();

        const wallet = new Wallet({
          userId: savedUser._id,
          amount: referralBonus[0].bonus,
        });

        await wallet.save();

        const referralWallet = await Wallet.findOne({
          userId: referralUser._id,
        });

        referralWallet.amount += referralBonus[0].bonus;

        await referralWallet.save();
      } else {
        const wallet = new Wallet({
          userId: savedUser._id,
          amount: 0,
        });
        await wallet.save();
      }

      // const token = jwt.sign(
      //   { _id: savedUser._id, mobile: savedUser.number },
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: "5d",
      //   }
      // );

      try {
        await axios.get(apiEndPoint);
        return res.status(201).json({
          success: true,
          message: "otp sent successfully",
        });
      } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
      }
    }

    if(emailOrNumber === '1234567890' || emailOrNumber === 1234567890){
      user.otp = '12345';
      await user.save();

       
        res.status(200).json({
          success: true,
          message: "otp sent successfully",
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const fiveDigitOtp = otp.toString().slice(0, 5);

    user.otp = fiveDigitOtp;

    await user.save();

    // const apiEndPoint = `http://bulksms.saakshisoftware.in/api/mt/SendSMS?user=demoss&password=123123&senderid=SAKSHI&channel=trans&DCS=0&flashsms=0&number=${emailOrNumber}&text=HI ${otp} REGARDS SAAKSHI SOFTWARE&route=04&DLTTemplateId=1407161562067880701&PEID=1701158097100985174`;
    const apiEndPoint = `http://bulksms.saakshisoftware.in/api/mt/SendSMS?user=PNKV&password=9852520&senderid=SCOSER&channel=trans&DCS=0&flashsms=0&number=${emailOrNumber}&text=Dear Sir/Ma'am, Your One Time Password (OTP) is ${fiveDigitOtp} .For mobile number verification in registration Please use this OTP to complete the transaction. Keep this OTP confidential and secure. Thanks %26 Regards, Team SAI COMPUTER ONLINE SERVICES    &route=04&DLTTemplateId=1707173019094159327&PEID=1701172966543474612`;

    try {
      await axios.get(apiEndPoint);
      res.status(200).json({
        success: true,
        message: "otp sent successfully",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { number, otp } = req.body;

    const user = await User.findOne({ number });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== Number(otp)) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign(
      { _id: user._id, mobile: user.number },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      }
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(10000 + Math.random() * 90000);
  user.otp = otp;
  await user.save();

  res.status(200).json({ message: "OTP sent successfully", otp });
};

exports.changePassword = async (req, res) => {
  const { email, otp, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.otp !== Number(otp)) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.otp = null;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

exports.viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editProfile = async (req, res) => {
  const { name, gender, number, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, gender, number, email },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReferralCode = async (req, res) => {
  try {
    const referralCode = await User.findById(req.user._id);
    res.status(200).json(referralCode.referral);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const wallet = await Wallet.findOne({ userId: id });
    const referral = await Referral.find({ refferedBy: id })
      .populate("refferedTo")
      .populate("refferedBy");
    res.status(200).json({ user, wallet, referral });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  const { name, number, email, city, password, gender } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ $or: [{ number }, { email }] });

    if (existingUser) {
      return res.json({ message: "Number or email already in use" });
    }

    const referralCode = await ensureUniqueReferralCode();

    const user = new User({
      name,
      number,
      email,
      city,
      password: hashedPassword,
      gender,
      referral: referralCode,
    });
    const savedUser = await user.save();

    const wallet = new Wallet({ userId: savedUser._id, amount: 0 });
    await wallet.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, number, email, password, gender } = req.body;

  let updateData = { name, number, email, gender };

  if (password && password !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const mlas = await MLA.countDocuments();
    const groups = await Groups.countDocuments();
    const districts = await District.countDocuments();
    const constituencies = await Constituency.countDocuments();
    const contests = await Contest.countDocuments();
    const cabinetMembers = await CabinetMember.countDocuments();
    const cabinetContests = await CabinetContest.countDocuments();

    const walletTransactions = await WalletTransaction.find({
      status: "success",
    })
      .populate("userId")
      .populate("cabinetContestId")
      .populate("contestId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      users,
      mlas,
      groups,
      districts,
      constituencies,
      contests,
      cabinetMembers,
      cabinetContests,
      walletTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.scrapeBase64 = async (req, res) => {
  const url = "https://qrstuff.me/gateway/pay/bf558d7968684af965b9e28e60b3ab42";

  if (!url) {
    return res.status(400).send("No URL provided");
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const base64String = $("img").attr("src");
    return res.send({ success: true, base64String: base64String });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the webpage");
  }
};

exports.walletAmount = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    res.status(200).json({ wallet });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
