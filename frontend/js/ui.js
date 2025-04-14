function renderCandidate(name, votes) {
    const div = document.createElement("div");
    div.innerText = `${name} - ${votes} votes`;
    document.getElementById("candidates").appendChild(div);
  }
  