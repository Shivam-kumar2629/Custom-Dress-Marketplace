 
function register() {
  return (
    <div>
      <div className="register-box">
        <input placeholder="Enter Full-Name"></input>
        <input placeholder="Enter E-mail" type="email"></input>
        <input placeholder="password" type="password"></input>
        <select>
          <option>Select Role</option>
          <option>Buyer</option>
          <option>Seller</option>
        </select>
        <button type="submit">Register</button>
      </div>
    </div>
  );
}

export default register;
