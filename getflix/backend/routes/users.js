const jsonschema = require("jsonschema");
const { createToken } = require("../tokens");
const express = require("express");
const { BadRequestError, NotFoundError } = require("../expressError");
const User = require("../models/user");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");


const router = express.Router();


/** POST /users { "user": { username, password, isAdmin } } => { user, token }
 * Allows admins to create new users.
 * If a non-admin user tries to use this route, an error will be thrown.
 */

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body.user, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const user = await User.register(req.body.user);
        const token = createToken(user);
        return res.status(201).json({ user, token });

    } catch (e) {
        next(e)
    }
});

/** GET /users => { "users": [{ username, is_admin }, ... ]}
 * Allows admins to see all registered users.
 * Non-admin users will throw an error.
 */

router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.getAll();
        return res.json({ users })
    } catch (e) {
        return next(e)
    }
});

/** GET /users/:username => { user }
 * "user": { username }
 */

router.get("/:username", async function (req, res, next) {
    try {
        const user = await User.getByUsername(req.params.username);
        if (!user) throw new NotFoundError("User not found")
        return res.json({ user })
    } catch (e) {
        return next(e);
    }
});

/** DELETE /users/:username => { message: "Deleted user" }
 * Must be same user or admin.
 * Removes a user from database and returns delete message.
 */

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ message: "Deleted user" })
    } catch (e) {
        return next(e)
    }
});

/** PATCH /users/:username { "user": { dataToUpdate } } => { user }
 * Must be same user or admin.
 * Update username or password of given user.
 */

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({ user })
    } catch (e) {
        return next(e);
    }
});

module.exports = router;