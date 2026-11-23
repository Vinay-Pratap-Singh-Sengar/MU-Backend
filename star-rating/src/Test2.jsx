import React from 'react'

function Test2() {
  let age = 20;
  let isGraduate = false
  let student = {
    name : "avesh",
    age : 23
  }
  return (
    <div>
        <h2>hello avesh</h2>
        <p>hi avesh</p>
        <p>{2+2+2}</p>
        <p>{age}</p>
        <p>{isGraduate.toString()}</p>
        <p>{student.name}</p>
        <p>{student.age}</p>
    </div>
  )
}

export default Test2
// // What is JSX in React?
// // JSX stands for JavaScript XML.

// // JSX is a syntax extension for JavaScript that allows us to write HTML-like code inside JavaScript.

// // In simple words, JSX allows us to write UI elements using HTML-like syntax inside React components.

// // 4. Important JSX rules
// // Rule 1: Return a single parent element

// // Incorrect:
// // function App() {
// //     return (
// //         <h1>Hello</h1>
// //         <p>Welcome</p>
// //     );
// // }


// Correct:
// function App() {
//     return (
//         <>
//             <h1>Hello</h1>
//             <p>Welcome</p>
//         </>
//     );
// }


// Rule 2: Use className instead of class
// <h1 className="heading">Hello</h1>


// Rule 3: JavaScript expressions must be written inside curly braces {}
// function App() {
//     const name = "Avesh";

//     return (
//         <h1>Hello {name}</h1>
//     );
// }


// Output: Hello Avesh

// Rule 4: All tags must be properly closed
// <img src="image.jpg" alt="Demo" />
// <input type="text" />