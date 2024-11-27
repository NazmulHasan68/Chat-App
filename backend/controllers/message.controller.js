import { Conversation } from "../models/conversation.Model.js"
import { Message } from "../models/message.Model.js"

export const sendMessage = async(req, res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id 
        const {message}= req.body

        let gotConversation = await Conversation.findOne({participants:{$all : [senderId , receiverId]}})
        if(!gotConversation) {
            gotConversation = await Conversation.create({
                participants:[senderId , receiverId]
            })
        }
        const newMessage =await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
            await gotConversation.save();
        }

        return res.status(200).json({success:true, newMessage, message: "message send succesullty!"})

        //socket io
    } catch (error) {
        console.log(error);
    }
}





export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id; // ID of the recipient
        const senderId = req.id; // ID of the sender (from middleware)

        // Find the conversation involving both sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate('messages'); // Populate the messages field

        if (!conversation) {
            // If no conversation is found, return a 404 response
            return res.status(404).json({
                success: false,
                message: 'Conversation not found',
            });
        }

        // Return the messages from the conversation
        return res.status(200).json({
            success: true,
            messages: conversation.messages,
        });
    } catch (error) {
        console.error('Error fetching messages:', error);

        // Return a 500 response for server errors
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching messages',
        });
    }
};
