const Notification = require("../models/notiModel");

async function getAllNotifications(req, res) {
  try {
    const data = await Notification.getAllNotifications();
    if (data) {
      res.status(200).send({
        message: "Get notifications successful",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false, data: null });
  }
}

async function getNotificationById(req, res) {
  const { questionId } = req.params;
  try {
    const data = await Notification.getNotificationById(questionId);
    if (data) {
      res.status(200).send({
        message: "Get notification successful",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false, data: null });
  }
}

async function updateNotification(req, res) {
  const { questionId, answer } = req.body;
  try {
    const data = await Notification.updateById(questionId, { answer: answer });
    if (data) {
      res
        .status(200)
        .send({ message: "Update successful", success: true, data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false, data: null });
  }
}

async function createNewNotification(req, res) {
  const { email, question } = req.body;
  try {
    const payload = { email: email, question: question };
    const data = await Notification.createNotification(payload);
    if (data) {
      res.status(200).send({
        message: "Create new notification successful",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false, data: null });
  }
}

async function deleteNotification(req, res) {
  const { questionId } = req.params;
  console.log(questionId);
  try {
    await Notification.deleteById(questionId);
    res.status(200).send({ message: "Notification deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error, success: false });
  }
}

module.exports = {
  getAllNotifications,
  updateNotification,
  deleteNotification,
  getNotificationById,
  createNewNotification,
};
