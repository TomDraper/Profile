const email = "mythirdalias@gmail.com"

function getData(form) {
    var formData = new FormData(form);
    var entries = Object.fromEntries(formData);
    var name = encodeURIComponent(entries["name"]);
    var subject = encodeURIComponent(entries["subject"]);
    var body = encodeURIComponent(entries["message"]);
    var message = encodeURIComponent(`Hi Tom, it's ${name}.\n\nI've seen your profile and I'd like to get in touch:\n\n${body}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
}

// function clearMessageBoxIfDefault(box){
//     console.log("Clicked")
//     console.log(box);
//     if (box.innerHTML == "Message..."){
//         box.innerHTML = "";
//     }
// }

// function resetMessageBoxIfEmpty(box){
//     console.log("Unclicked")
//     console.log(box);
//     if (box.innerHTML == ""){
//         box.innerHTML = "Message...";
//     }
// }

form = document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});

// messageBox = document.getElementById("message").addEventListener("focus", (e) => clearMessageBoxIfDefault(e.target));

// messageBox = document.getElementById("message").addEventListener("blur", (e) => resetMessageBoxIfEmpty(e.target));