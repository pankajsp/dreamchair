const express = require("express");
const router = express.Router();
const middleware = require("../middleware/AdminMiddleware");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const partyController = require("../controllers/party");
const upload = require("../multerConfig.js");
const groupsController = require("../controllers/groups");
const mlaController = require("../controllers/mla");
const districtController = require("../controllers/district");
const constituencyController = require("../controllers/constituency");
const contestController = require("../controllers/Contest.js");
const selectedMLAController = require("../controllers/selectedMLA");
const referralBonusController = require("../controllers/referralBonus");
const helpAndSupportController = require("../controllers/helpAndSupport");
const appUpdateController = require("../controllers/appUpdate");
const referralController = require("../controllers/referral.js");
const cabinetController = require("../controllers/cabinet");
const cabinetContestController = require("../controllers/cabinetContest");
const cabinetMembersController = require("../controllers/cabinetMembers");
const walletTransactionController = require("../controllers/walletTransaction.js");
const upiGatewaysController = require("../controllers/upiGateways");
const privacyPolicyController = require("../controllers/privacyPolicy");
const termsAndConditionController = require("../controllers/termsAndCondition");
const exitPollController = require("../controllers/exitPoll");
const exitPollContestController = require("../controllers/ExitPollContest");
const exitPollPredictionController = require("../controllers/exitPollPrediction");
const cabinetContestSelectedMemberController = require("../controllers/cabinetContestSelectedMember");
const paymentMethodsController = require("../controllers/paymentMethods");

router.post("/login", adminController.login);
router.put("/change-password", middleware, adminController.changePassword);

router.get("/user", middleware, userController.getUsers);
router.get("/user/:id", middleware, userController.getUserById);
router.post("/user", middleware, userController.createUser);
router.put("/user/:id", middleware, userController.updateUserById);
router.delete("/user/:id", middleware, userController.deleteUserById);

router.post(
  "/party",
  middleware,
  upload.single("image"),
  partyController.addParty
);
router.put(
  "/party/:id",
  middleware,
  upload.single("image"),
  partyController.updatePartyById
);
router.delete("/party/:id", middleware, partyController.deletePartyById);
router.get("/party", middleware, partyController.getParties);
router.get("/party/:id", middleware, partyController.getPartyById);

router.post("/groups", middleware, groupsController.addGroup);
router.get("/groups", middleware, groupsController.getGroups);
router.get("/groups/:id", middleware, groupsController.getGroupById);
router.put("/groups/:id", middleware, groupsController.updateGroupById);
router.delete("/groups/:id", middleware, groupsController.deleteGroupById);

router.post("/district", middleware, districtController.addDistrict);
router.get("/district", middleware, districtController.getDistricts);
router.get("/district/:id", middleware, districtController.getDistrictById);
router.put("/district/:id", middleware, districtController.updateDistrictById);
router.delete(
  "/district/:id",
  middleware,
  districtController.deleteDistrictById
);

router.post(
  "/constituency",
  middleware,
  constituencyController.addConstituency
);
router.get(
  "/constituency",
  middleware,
  constituencyController.getConstituencies
);
router.get(
  "/constituency/district/:id",
  middleware,
  constituencyController.getConstituenciesByDistrictId
);
router.get(
  "/constituency/:id",
  middleware,
  constituencyController.getConstituencyById
);
router.put(
  "/constituency/:id",
  middleware,
  constituencyController.updateConstituencyById
);
router.delete(
  "/constituency/:id",
  middleware,
  constituencyController.deleteConstituencyById
);

router.post("/mla", middleware, upload.single("image"), mlaController.addMLA);
router.post(
  "/bulk-mla",
  middleware,
  upload.single("image"),
  mlaController.addBulkMLA
);
router.get("/mla", middleware, mlaController.getMLAs);
router.get("/mla/:id", middleware, mlaController.getMLAById);
router.put(
  "/mla/:id",
  middleware,
  upload.single("image"),
  mlaController.updateMLAById
);
// router.delete("/mla/:id", middleware, mlaController.deleteMLAById);

router.post("/contest", middleware, contestController.addContest);
router.post(
  "/contest-bulk-upload",
  middleware,
  contestController.addBulkContest
);
router.get("/contest", middleware, contestController.getContests);
router.get("/contest/:id", middleware, contestController.getContestById);
router.put("/contest/:id", middleware, contestController.updateContestById);
router.delete("/contest/:id", middleware, contestController.deleteContestById);
router.put("/fill-contest/:id", middleware, contestController.fillContestById);

//test _-------------------------------------------------------------------------------------------
router.get(
  "/contest/mla/:contestId",
  middleware,
  contestController.getContestMLA
);
router.post(
  "/selected-mla",
  middleware,
  selectedMLAController.createSelectedMLA
);

router.get(
  "/referral-bonus",
  middleware,
  referralBonusController.referralBonus
);
router.put(
  "/referral-bonus",
  middleware,
  referralBonusController.updateReferralBonus
);

router.get("/referral", middleware, referralController.getReferrals);

router.get(
  "/help-and-support",
  middleware,
  helpAndSupportController.helpAndSupportAdmin
);
router.delete(
  "/help-and-support/:id",
  middleware,
  helpAndSupportController.deleteHelpAndSupportAdmin
);

router.post(
  "/cabinet",
  middleware,
  upload.single("image"),
  cabinetController.addCabinet
);
router.put(
  "/cabinet/:id",
  middleware,
  upload.single("image"),
  cabinetController.updateCabinetById
);
router.delete("/cabinet/:id", middleware, cabinetController.deleteCabinetById);
router.get("/cabinet", middleware, cabinetController.getCabinets);
router.get("/cabinet/:id", middleware, cabinetController.getCabinetById);

router.post(
  "/cabinet-contest",
  middleware,
  cabinetContestController.addCabinetContest
);
router.post(
  "/cabinet-contest-bulk-upload",
  middleware,
  cabinetContestController.addBulkCabinetContest
);
router.get(
  "/cabinet-contest",
  middleware,
  cabinetContestController.getCabinetContests
);
router.get(
  "/cabinet-contest/:id",
  middleware,
  cabinetContestController.getCabinetContestById
);
router.put(
  "/cabinet-contest/:id",
  middleware,
  cabinetContestController.updateCabinetContestById
);
router.delete(
  "/cabinet-contest/:id",
  middleware,
  cabinetContestController.deleteCabinetContestById
);
router.put(
  "/cabinet-contest/:id",
  middleware,
  cabinetContestController.fillCabinetContestById
);

router.post(
  "/cabinet-member",
  middleware,
  upload.single("image"),
  cabinetMembersController.addCabinetMember
);
router.post(
  "/cabinet-member-bulk-upload",
  middleware,
  upload.single("image"),
  cabinetMembersController.addBulkCabinetMember
);
router.get(
  "/cabinet-member",
  middleware,
  cabinetMembersController.getCabinetMembers
);
router.get(
  "/cabinet-member/:id",
  middleware,
  cabinetMembersController.getCabinetMemberById
);
router.put(
  "/cabinet-member/:id",
  middleware,
  upload.single("image"),
  cabinetMembersController.updateCabinetMemberById
);
router.delete(
  "/cabinet-member/:id",
  middleware,
  cabinetMembersController.deleteCabinetMemberById
);

router.get("/app-update", middleware, appUpdateController.getAppUpdate);
router.put("/app-update", middleware, appUpdateController.updateAppUpdate);

router.get(
  "/wallet-transaction",
  middleware,
  walletTransactionController.getWalletTransaction
);
router.get(
  "/wallet-transaction/:id",
  middleware,
  walletTransactionController.getWalletTransactionByIdAdmin
);
router.post(
  "/filter-wallet-transaction",
  middleware,
  walletTransactionController.filterWalletTransaction
);

router.post("/upi-gateway", middleware, upiGatewaysController.createUpiGateway);
router.get("/upi-gateway", middleware, upiGatewaysController.getUpiGateways);
router.get(
  "/upi-gateway/:id",
  middleware,
  upiGatewaysController.getUpiGatewayById
);
router.put(
  "/upi-gateway/:id",
  middleware,
  upiGatewaysController.updateUpiGateway
);
router.delete(
  "/upi-gateway/:id",
  middleware,
  upiGatewaysController.deleteUpiGateway
);

router.put(
  "/privacy-policy",
  middleware,
  privacyPolicyController.updatePrivacyPolicy
);
router.get(
  "/privacy-policy",
  middleware,
  privacyPolicyController.privacyPolicy
);

router.put(
  "/terms-and-condition",
  middleware,
  termsAndConditionController.updateTermsAndCondition
);
router.get(
  "/terms-and-condition",
  middleware,
  termsAndConditionController.termsAndCondition
);

router.post(
  "/exit-poll",
  middleware,
  upload.single("image"),
  exitPollController.addExitPoll
);
router.put(
  "/exit-poll/:id",
  middleware,
  upload.single("image"),
  exitPollController.updateExitPollById
);
// router.delete(
//   "/exit-poll/:id",
//   middleware,
//   exitPollController.deleteExitPollById
// );
router.get("/exit-poll", middleware, exitPollController.getExitPolls);
router.get("/exit-poll/:id", middleware, exitPollController.getExitPollById);

router.post(
  "/exit-poll-contest",
  middleware,
  exitPollContestController.addExitPollContest
);
router.post(
  "/exit-poll-contest-bulk-upload",
  middleware,
  exitPollContestController.addBulkExitPollContest
);
router.get(
  "/exit-poll-contest",
  middleware,
  exitPollContestController.getExitPollContests
);
router.get(
  "/exit-poll-contest/:id",
  middleware,
  exitPollContestController.getExitPollContestById
);
router.put(
  "/exit-poll-contest/:id",
  middleware,
  exitPollContestController.updateExitPollContestById
);
router.delete(
  "/exit-poll-contest/:id",
  middleware,
  exitPollContestController.deleteExitPollContestById
);
router.put(
  "/exit-poll-contest/:id",
  middleware,
  exitPollContestController.fillExitPollContestById
);

router.get(
  "/exit-poll-prediction",
  middleware,
  exitPollPredictionController.getAllExitPollPrediction
);
router.get(
  "/cabinet-contest-report",
  middleware,
  cabinetContestSelectedMemberController.cabinetContestReport
);
router.get(
  "/cabinet-contest-report/:id",
  middleware,
  cabinetContestSelectedMemberController.cabinetContestReportById
);

router.get(
  "/get-all-selected-mla",
  middleware,
  selectedMLAController.getAllSelectedMLA
);

router.get(
  "/payment-methods",
  middleware,
  paymentMethodsController.getAllPaymentMethods
);
router.put(
  "/payment-methods/:action/:id",
  middleware,
  paymentMethodsController.updatePaymentMethods
);

router.get("/dashboard", middleware, userController.getDashboard);

module.exports = router;
