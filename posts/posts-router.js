const express = require("express");
const posts = require("../data/db");

const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Missing title or contents",
    });
  }
  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error adding post",
      });
    });
});

router.get("/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Couldn't find a post with that id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving post from database",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Need title and contents in body",
    });
  }
  posts
    .update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Couldn't retrieve post with specified ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "could not update post",
      });
    });
});

router.delete("/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "Couldn't find post with the specified ID",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting post",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "Could not retrieve post with that ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not retrieve comments",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id: post_id } = req.params;
  const { text } = req.body;

  if (!req.body.text) {
    res.status(404).json({
      message: "Missing body text",
    });
  }
  posts
    .insertComment({ text, post_id })
    .then((comment) => {
      if (req.params) {
        res.status(201).json(comment);
      } else {
        res.status(400).json({
          message: "Could not find post by ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error posting comment",
      });
    });
});
