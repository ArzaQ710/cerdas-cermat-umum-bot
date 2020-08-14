import React from "react";

function AddEditor() {

  // const []

  return (
    <div class="mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <form>
        <div class="text-center mb-4">
          <h2>Add Editor</h2>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            name="username"
            aria-describedby="usernameHelp"
          />
          <small id="usernameHelp" class="form-text text-danger"></small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            aria-describedby="passwordHelp"
          />
          <small id="passwordHelp" class="form-text text-danger"></small>
        </div>
        <div class="from-group">
          <label for="confirm_password">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirm_password"
            name="confirm_password"
            aria-describedby="confirmPasswordHelp"
          />
          <small id="confirmPasswordHelp" class="form-text text-danger"></small>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditor;
