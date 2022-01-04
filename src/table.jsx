import React, { useState, useEffect } from 'react';
import _, { get } from 'lodash';
import data from './Data.json';
import "./App.css";

const Table = () => {
    const [expenses, setExpense] = useState(data);
    const [purpose, setPurpose] = useState('');
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [budget, setBudget] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showBudget, setShowBudget] = useState(false);
    const [stuff, setStuff] = useState([{}]);
    

    const handleAddFormSubmit = (event) => {
        fetch('/table?' + new URLSearchParams({
            purp: `${purpose}`,
            amt: amount,
        })).then(x => x.json()).then(x => console.log(x));
        
        event.preventDefault();

        const newExpense = {
            Purpose: purpose,
            Amount: amount,
        };

        const newExpenses =  [...expenses, newExpense];

        setExpense(newExpenses);
    };

    const CalcTotal = () => {
        const amts = expenses.map((obj) => parseFloat(obj.Amount));
        const total = _.sum(amts);
        setTotal(total)
        setShowTotal(true)
    };

    const UserBudget = () => {
        setShowBudget(true)
    }

    return(
        <div className='app-container'>
            <div className="app-child table">
                <table>
                    <thead>
                        <tr>
                            <th> Purpose </th>
                            <th> Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expenses) => (
                            <tr>
                                <td> {expenses.Purpose} </td>
                                <td> {expenses.Amount} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
                <h3> Add an Expense </h3>

                    <form onSubmit={handleAddFormSubmit}>
                        <input 
                            type="text"
                            name="Purpose" 
                            required="required" 
                            placeholder='Add a Purpose'
                            onChange={e => setPurpose(e.target.value)}
                        />
                        <input 
                            type="number" 
                            step="0.0000001"
                            min="0"
                            name="Amount" 
                            required="required" 
                            placeholder='Add an Amount'
                            onChange={e => setAmount(e.target.value)}
                        />
                        <button type='submit'>Add</button>
                    </form>

                <br />
                <div hidden={setShowTotal}>
                    <h3> Total : {total} </h3>
                </div>
                <button onClick={CalcTotal}>
                    Total 
                </button>
            </div>
            <div 
                hidden={setShowBudget}
                className='app-child budget'>
                <h4> Budget : {budget} </h4>
                <form>
                    <input 
                        type="number"
                        step="0.00000001"
                        min="0"
                        name="Budget"
                        required="required"
                        onChange={e => setBudget(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}

export default Table;
