const API = "http://localhost:5000/api";

function showToast(message){

const toast = document.getElementById("toast");

toast.innerText = message;

toast.classList.add("show");

setTimeout(() => {

toast.classList.remove("show");

},3000);

}


async function register() {

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // ✅ Validation FIRST
  if (!name || !phone) {

    showToast("⚠️ Please enter name and phone number");

    return;   // stop execution

  }

  const res = await fetch("/api/register", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      phoneNumber: phone
    })

  });

  const data = await res.json();

  if (res.status === 201) {

    showToast("✅ User registered successfully! Check instruction below.");
    document.getElementById("joinstep").style.display="block";

    nameInput.value = "";
    phoneInput.value = "";

  }

  else if (res.status === 200) {

    showToast("👋 Welcome back!");

    nameInput.value = "";
    phoneInput.value = "";

  }

  else {

    showToast(data.message);

  }

}


async function loadExpenses() {

  const userId = localStorage.getItem("userId");

  const res = await fetch(`${API}/expenses/${userId}`);

  const data = await res.json();

  const table = document.getElementById("expenseTable");

  table.innerHTML = "";

  data.expenses.forEach(exp => {

    const row = `
      <tr>
      <td>${exp.id}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.description}</td>
      </tr>
    `;

    table.innerHTML += row;

  });

  // Render chart
  renderChart(data.expenses);
}


function downloadExcel(){

  const userId = localStorage.getItem("userId");

  window.open(`${API}/expenses/${userId}/export`);
}



/* ---------- ADD THIS FUNCTION HERE ---------- */

function renderChart(expenses){

let categories = {};

expenses.forEach(e => {

categories[e.category] = (categories[e.category] || 0) + e.amount;

});

const ctx = document.getElementById("expenseChart");

new Chart(ctx, {

type: "pie",

data: {

labels: Object.keys(categories),

datasets: [{

data: Object.values(categories),

backgroundColor: [
"#ff6384",
"#36a2eb",
"#ffcd56",
"#4bc0c0",
"#9966ff"
]

}]

}

});

}