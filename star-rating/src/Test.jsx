import { createElement } from "react";

function Test() {
    const h1 = createElement('h1', null, "hello avesh");
    const h2 = createElement('h2',null, "how are you");
    const h3 = createElement('h3', null , "vinay sengar")

    return (
        <>
            {h1}
            {h2}
            {h3}
        </>
    );
}

export default Test;