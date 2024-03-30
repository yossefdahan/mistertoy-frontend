import { useState } from "react"
import { toyService } from "../services/toy.service"


export function ToyMsgs({ toy, onMessageSaved }) {
    const [msg, setMsg] = useState(toyService.getEmptyMsg().msgs[0].txt)


    function handleChange(event) {

        setMsg(event.target.value)

    }

    async function onSaveMsg() {
        try {

            await toyService.saveMsg(toy._id, { txt: msg })
            setMsg('')
            onMessageSaved()
        } catch (err) {
            console.error('Failed to save message', err)
        }
    }

    return <div className="toy-msgs-container">
        {/* <input type="text" placeholder="Type your message here..." value={msg} onChange={handleChange} /> */}
        <textarea type="text" placeholder="Type your message here..." value={msg} onChange={handleChange} />
        <button onClick={onSaveMsg}>Save message</button>

    </div>
}