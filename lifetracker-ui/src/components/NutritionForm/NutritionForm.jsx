import * as React from "react"
import { useState, useEffect } from "react"
import "./NutritionForm.css"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"

function NutritionForm(props) {
  const [form, setForm] = useState({
    name: "",
    calories: 1,
    image_url: "",
    category: "",
    quantity: 1
  })
const [error, setError] = useState({})
const [posted, setPosted] = useState(false)
const navigate = useNavigate()

useEffect(() => {
    if(posted){
        navigate("/nutrition")
    }
}, [posted, navigate])

const handleOnInputChange = (event) => {
    setForm((state) => ({ ...state, [event.target.name]: event.target.value }))
}

const handleSubmit = async (e) => {
    setError((state) => ({...state, form: null}))
    e.preventDefault()

    if(form.name == ""){
        setError((state) => ({...state, form: "No name provided"}))
        return;
    }

    if(form.category == ""){
        setError((state) => ({...state, form: "No category provided"}))
        return;
    }

    const {data, err} = await apiClient.createNutrition({name: form.name,
                calories: form.calories,
                image_url: form.image_url,
                category: form.category,
                quantity: form.quantity})

    if(err) setError((state) => ({ ...state, form: err?.response?.data?.error?.message }))
    if (data){
        setForm({
                name: "",
                calories: 1,
                image_url: "",
                category: "",
                quantity: 1
            })
        setPosted(true)
    }

}

    return (
        <div className="nutrition-form">
                  <h1>Record Nutrition</h1>

        <form>
        <div className="form-inputs">
        <div className="input-field">
            <label>Name</label>
            <input className="form-input" type="text" name="name"
                            placeholder="Nutrition name"
                            value={form.name}
                            onChange={handleOnInputChange}/>
        </div>

        <div className="input-field">
            <label>Calories</label>
            <input className="form-input" type="number" name="calories"
                                placeholder="1"
                                value={form.calories}
                                onChange={handleOnInputChange}/>
        </div>

        <div className="input-field">
            <label>Image Url</label>
            <input className="form-input" type="url" name="image_url"
                            placeholder="http://www.food-image.com/1"
                            value={form.image_url}
                            onChange={handleOnInputChange}/>
        </div>

        <div className="input-field">
            <label>Category</label>
            <input className="form-input" type="text" name="category"
                            placeholder="Nutrition category"
                            value={form.category}
                            onChange={handleOnInputChange}/>
        </div>

        <div className="input-field">
            <label>Quantity</label>
            <input className="form-input" type="number" name="quantity"
                            placeholder="Nutrition quantity"
                            value={form.quantity}
                            onChange={handleOnInputChange}/>
        </div>

        </div>
        <button className="submit-nutrition" onClick={handleSubmit}>Save</button>
        {error.form ? <p className="error">{error.form}</p> : null}
        </form>
        </div>
      )
}

export default NutritionForm;