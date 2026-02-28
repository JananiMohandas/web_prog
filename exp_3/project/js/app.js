const DUMMY_URL = "https://jsonplaceholder.typicode.com";

let cart = [];
let lastOrderId = null;


$(document).ready(function () {

  showMsg("GET: Loading menu from server...");

  $.ajax({
    url: DUMMY_URL + "/posts?_limit=5",
    type: "GET",
    success: function (data) {

      const menuItems = [
        { id: 1, name: "Veg Burger",   desc: "Crispy veggie patty",   price: 89  },
        { id: 2, name: "Chicken Wrap", desc: "Spicy grilled chicken", price: 129 },
        { id: 3, name: "Paneer Pizza", desc: "Cheesy paneer delight", price: 199 },
        { id: 4, name: "French Fries", desc: "Golden & salted",       price: 59  },
        { id: 5, name: "Mango Shake",  desc: "Fresh mango blend",     price: 79  },
      ];

      $.each(menuItems, function (i, item) {
        const html = `
          <div class="menu-item">
            <div>
              <strong>${item.name}</strong> – ${item.desc} &nbsp; <b>₹${item.price}</b>
            </div>
            <button class="add-btn"
              data-id="${item.id}"
              data-name="${item.name}"
              data-price="${item.price}">+ Add</button>
          </div>`;
        $("#menu-container").append(html);
      });

      showMsg("GET Success: Menu loaded (" + data.length + " records fetched from server)");
    },
    error: function () {
      showMsg("GET Failed: Could not load menu");
    }
  });

});

// ─────────────────────────────────────────────
// Add to Cart
// ─────────────────────────────────────────────
$(document).on("click", ".add-btn", function () {
  const id    = parseInt($(this).data("id"));
  const name  = $(this).data("name");
  const price = parseInt($(this).data("price"));

  const exists = cart.find(c => c.id === id);
  if (exists) {
    exists.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  renderCart();
});

// ─────────────────────────────────────────────
// Remove from Cart
// ─────────────────────────────────────────────
$(document).on("click", ".remove-btn", function () {
  const id = parseInt($(this).data("id"));
  cart = cart.filter(c => c.id !== id);
  renderCart();
});

// ─────────────────────────────────────────────
// Render Cart UI
// ─────────────────────────────────────────────
function renderCart() {
  $("#cart-items").empty();

  if (cart.length === 0) {
    $("#cart-items").html('<p id="empty-msg">Cart is empty.</p>');
    $("#cart-footer").hide();
    return;
  }

  let total = 0;
  $.each(cart, function (i, item) {
    total += item.price * item.qty;
    const row = `
      <div class="cart-item">
        <span>${item.name} x ${item.qty}</span>
        <span>Rs.${item.price * item.qty}
          <button class="remove-btn" data-id="${item.id}">X</button>
        </span>
      </div>`;
    $("#cart-items").append(row);
  });

  $("#total-price").text(total);
  $("#cart-footer").show();
}

// ─────────────────────────────────────────────
// POST – Place New Order
// ─────────────────────────────────────────────
$(document).on("click", "#place-order-btn", function () {
  if (cart.length === 0) return;

  const orderItems = cart.map(c => c.name + " x" + c.qty).join(", ");
  const total      = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  showMsg("POST: Sending order to server...");

  $.ajax({
    url: DUMMY_URL + "/posts",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ items: cart, total: total, address: "Default Address" }),
    success: function (response) {
      // jsonplaceholder always returns id:101 for new posts
      // We use a valid ID (1-100) for PUT/DELETE to work correctly
      lastOrderId = 1;

      $("#status-title").text("Order Placed!");
      $("#order-summary-text").text("Items: " + orderItems);
      $("#loading-msg").text(
        "POST Success | Server returned ID: " + response.id +
        " | Using ID #" + lastOrderId + " for PUT/DELETE | Total: Rs." + total
      );

      showMsg("POST Success: Order created. Ready for PUT / DELETE using ID #" + lastOrderId);
    },
    error: function () {
      showMsg("POST Failed: Could not place order");
    }
  });

  cart = [];
  renderCart();
});

// ─────────────────────────────────────────────
// PUT – Update Order Address
// ─────────────────────────────────────────────
$(document).on("click", "#put-btn", function () {
  const newAddress = $("#new-address").val().trim();

  if (!lastOrderId) {
    showMsg("Warning: No order placed yet. Place an order first!");
    return;
  }
  if (!newAddress) {
    showMsg("Warning: Please enter a new address.");
    return;
  }

  showMsg("PUT: Updating order #" + lastOrderId + " with new address...");

  $.ajax({
    url: DUMMY_URL + "/posts/" + lastOrderId,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      id: lastOrderId,
      title: "Food Order",
      body: "Delivery Address: " + newAddress,
      userId: 1
    }),
    success: function (response) {
      showMsg(
        "PUT Success: Order #" + lastOrderId + " updated! New address -> " + newAddress +
        " | Server response ID: " + response.id
      );
      $("#new-address").val("");
    },
    error: function (xhr) {
      showMsg("PUT Failed: " + xhr.status + " " + xhr.statusText);
    }
  });
});

// ─────────────────────────────────────────────
// DELETE – Cancel Order
// ─────────────────────────────────────────────
$(document).on("click", "#delete-btn", function () {
  if (!lastOrderId) {
    showMsg("Warning: No order placed yet. Place an order first!");
    return;
  }

  showMsg("DELETE: Cancelling order #" + lastOrderId + "...");

  $.ajax({
    url: DUMMY_URL + "/posts/" + lastOrderId,
    type: "DELETE",
    success: function () {
      showMsg("DELETE Success: Order #" + lastOrderId + " cancelled and removed from server.");
      lastOrderId = null;
      $("#status-title").text("");
      $("#order-summary-text").text("");
      $("#loading-msg").text("");
    },
    error: function (xhr) {
      showMsg("DELETE Failed: " + xhr.status + " " + xhr.statusText);
    }
  });
});

// ─────────────────────────────────────────────
// Helper – Show response message
// ─────────────────────────────────────────────
function showMsg(msg) {
  $("#manage-response").text(msg);
}
