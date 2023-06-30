import { React } from 'react'
import data from "./ListData.json"

function List(inputText) {
    //create a new array by filtering the original array
    const filteredData = data.filter((element) => {
        //if no input the return the original
        if (inputText.input === '') {
            return element;
        }
        //return the item which contains the user input
        else {
            return element.title?.toLowerCase().replace(/ /g,"").includes(inputText.input)
        }
    })
    return (
        <ul className="cards_list">
            {filteredData.map((item) => (
                <li className="cards_item" key={item.id}>
                <div className="card_container">
                  <div className="card_image"><img src={item.image} alt={item.title} /></div>
                  <div className="card_content">
                    <h2 className="card_title">{item.title}</h2>
                    <p className="card_text">{item.description}</p>
                    <button className="btn card_btn">Read More</button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
    )
}
export default List