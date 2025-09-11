import {useState} from "react";
import {usePosts} from "../contexts/PostsContext.jsx";

export default function Form({onSubmit}) {
    const [formData, setFormData] = useState({
        content: "",
        category: "",
        location: ""
    });     
}