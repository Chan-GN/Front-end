window.addEventListener('load', () => {
    document.getElementById('addButton').addEventListener('click', add);
});

function add() {
    const f = document.forms[0];
    let result = Number(f.first.value) + Number(f.second.value);
    document.getElementById("result").innerHTML =
        `<span style="color: red;">Result: ${result}</span>`;
    document.getElementById("result").style.visibility = "visible";
}