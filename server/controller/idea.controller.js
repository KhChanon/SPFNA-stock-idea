const Idea = require("../model/Idea");
const User = require("../model/User");
const Comment = require("../model/Comment");
const ErrorHandler = require("../utils/errorHandler");


// // GET all ideas
// // Page: Allideas Page
const getAllIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find()
        for(let i = 0; i < ideas.length; i++){
            const user = await User.findById(ideas[i].user);
            ideas[i].user = user;
        }

        res.status(200).json({
            success: true,
            count: ideas.length,
            ideas: ideas,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// // GET all ideas by user id
// // Page: Profile Page
const getIdeasByUserId = async (req, res) => {
    try {
        const ideas = await Idea.find({ user: req.params.id });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // Add a new idea
// // Page: Writeidea Page
const addIdea = async (req, res, next) => {
    const { title, details} = req.body;
    console.log(title, details);
    const user = await User.findById(req.user._id);
    const idea = await Idea.findOne({ title });
    if (idea && idea.title === title) {
        res.json({success:false,message: "Title already exists"});
        return next(new ErrorHandler("Title already exists", 401));
    }
    else if(title.length < 6){
        res.json({sucecess:false,message:"Title must be at least 6 characters"});
        return next(new ErrorHandler("Title must be at least 6 characters",401));
    }
    else if(details.length < 6){
        res.json({sucecess:false,message:"Details must be at least 6 characters"});
        return next(new ErrorHandler("Details must be at least 6 characters",401));
    }
    const newIdea = await Idea.create({
        title,
        details,
        status: "posted",
        user: user._id
    });
    res.json({ success: true, message: "Idea created successfully" });
}

// // Draft an idea
// // Page: Writeidea Page
const draftIdea = async (req, res, next) => {
    const { title, details } = req.body;
    console.log(title, details);
    const user = await User.findById(req.user._id);
    const idea = await Idea.findOne({ title });
    if (idea && idea.title === title) {
        res.json({success:false,message: "Title already exists"});
        return next(new ErrorHandler("Title already exists", 401));
    }
    const newIdea = await Idea.create({
        title,
        details,
        status: "draft",
        user: user._id
    });
    res.json({ success: true, message: "Idea drafted successfully" });
}


// // Add a new comment to the idea
// // Page: AllIdea Page
const addComment = async (req, res) => {
    const { comment, user, idea_id } = req.body;
    try {
        const newComment = await Comment.create({
            comment,
            user,
            idea
        });
        const idea = await Idea.findById(idea_id);
        idea.comment.push(newComment);
        await idea.save();
        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllIdeas,
    getIdeasByUserId,
    addIdea,
    draftIdea,
    addComment
}
