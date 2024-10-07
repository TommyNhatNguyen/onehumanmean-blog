const db = require("../configs/db");
const Projects = require("../models/projectsModel");

async function getAllProjects(req, res) {
  let { limit, page, created_at, updated_at, category, position, hidden } =
    req.query;
  let results;
  try {
    const data = await Projects.getAll();
    results = data;
    /** Start: Filter by created date */
    if (created_at && ["new", "old"].includes(created_at)) {
      if (created_at === "new") {
        results = results.sort((a, b) => b.created_at - a.created_at);
      } else if (created_at === "old") {
        results = results.sort((a, b) => a.created_at - b.created_at);
      }
    }
    /** ---End--- */

    /** Start: Filter by updated date */
    if (updated_at && ["new", "old"].includes(updated_at)) {
      if (updated_at === "new") {
        results = results.sort((a, b) => b.updated_at - a.updated_at);
      } else if (updated_at === "old") {
        results = results.sort((a, b) => a.updated_at - b.updated_at);
      }
    }
    /** ---End--- */

    /** Start: Filter by category */
    if (category && typeof category === "string") {
      const categoryList = category.split(",");
      results = results.filter((item) => {
        return item.category
          .toLowerCase()
          .split(",")
          .some((element) => categoryList.includes(element));
      });
    }
    /** ---End--- */

    /** Start: Filter by position */
    if (
      position &&
      ["hero", "hero2", "hero3", "hero4", "default"].includes(position)
    ) {
      results = results.filter((item) => item.position === position);
    }
    /** ---End--- */

    /** Start: Filter by hidden */
    if (hidden) {
      results = results.filter((item) => !item.hidden);
    }
    /** ---End--- */

    /** Start: Pagination */
    if (limit && page) {
      limit = Number(limit);
      page = Number(page);
      let startIndex = (page - 1) * limit;
      let endIndex = startIndex + limit;
      if (endIndex > results.length - 1) {
        endIndex = results?.length;
      }
      if (startIndex < 0) {
        startIndex = 0;
      }
      results = results.slice(startIndex, endIndex);
    }
    /** ---End--- */

    /** Start: Final Response */
    if (results) {
      res
        .status(200)
        .json({ message: "Success", success: true, data: results });
    } else {
      res
        .status(400)
        .json({ message: "Bad request", success: false, data: null });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
  /** ---End--- */
}

async function getProjectById(req, res) {
  const projectId = req?.params?.projectId;
  try {
    const data = await Projects.getById(projectId);
    if (data) {
      res.status(200).json({ message: "Success", success: true, data: data });
    } else {
      res
        .status(400)
        .json({ message: "Bad request", success: false, data: null });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, success: false, data: null });
  }
}

async function createProject(req, res) {
  const { title, position, category, author } = req.body;
  const thumbnailUrl = res.locals.thumbUrl;
  const newContent = res.locals.newContent;
  const payload = {
    title,
    content: newContent,
    position,
    category,
    author,
    thumbnail_url: thumbnailUrl,
  };
  try {
    const data = await Projects.create(payload);
    if (data) {
      res.status(201).json({
        message: "Create new post successful",
        success: true,
        data: data,
      });
    } else {
      res.status(400).json({
        message: "Create new post fail",
        success: fail,
        data: null,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `Wrong payload`, success: false, data: null });
  }
}

async function updateProject(req, res) {
  let payload;
  const projectId = req.params.projectId;
  const thumbnailUrl = res.locals.thumbUrl;
  const newContent = res.locals.newContent;
  if (!thumbnailUrl || !newContent) {
    payload = { ...req.body };
  } else {
    payload = {
      ...req.body,
      content: newContent,
      thumbnail_url: thumbnailUrl,
    };
  }
  try {
    const data = await Projects.updateById(projectId, payload);
    if (data) {
      res.status(200).json({
        message: "Update project successful",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, success: false, data: null });
  }
}

async function deleteProject(req, res) {
  const projectId = req.params.projectId;
  try {
    const data = await Projects.deleteById(projectId);
    if (data) {
      res
        .status(200)
        .json({ message: "Delete successful", success: true, data: data });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, success: false, data: null });
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
