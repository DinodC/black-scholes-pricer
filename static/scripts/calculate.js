// Function calculate() collects inputs, computes and displays outputs
function calculate(){
  // Retrieve inputs
  // Spot
  var spot = document.getElementById("spot").value;
  spot = parseFloat(spot);
  // Strike
  var strike = document.getElementById("strike").value;
  strike = parseFloat(strike);
  // Riskfree
  var riskfree = document.getElementById("riskfree").value;
  riskfree = parseFloat(riskfree) / 100.0;
  // Dividend
  var dividend = document.getElementById("dividend").value;
  dividend = parseFloat(dividend) / 100.0;
  // Maturity
  var maturity = document.getElementById("maturity").value;
  maturity = parseFloat(maturity);
  // Volatility
  var volatility = document.getElementById("volatility").value;
  volatility = parseFloat(volatility) / 100.0;

  // Calculate carry rate
  var carry = 0.0;
  if (document.getElementById("future").checked) {
    carry = 0.0;
  } else {
    carry = riskfree - dividend;
  }

  // Calculate option value and greeks
  // Call
  var temp_call = 0.0;
  temp_call = option(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_call = temp_call.toFixed(4);
  // Put
  var temp_put = 0.0;
  temp_put = option(spot, strike, riskfree, carry, maturity, volatility, -1);
  temp_put = temp_put.toFixed(4);
  // Delta
  var temp_delta_call = 0.0;
  temp_delta_call = delta(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_delta_call = temp_delta_call.toFixed(4);
  var temp_delta_put = 0.0;
  temp_delta_put = delta(spot, strike, riskfree, carry, maturity, volatility, -1);
  temp_delta_put = temp_delta_put.toFixed(4);
  // Gamma
  var temp_gamma = 0.0;
  temp_gamma = gamma(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_gamma = temp_gamma.toFixed(4);
  // Vega
  var temp_vega = 0.0;
  temp_vega = vega(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_vega = temp_vega.toFixed(4);
  // Theta
  var temp_theta_call = 0.0;
  temp_theta_call = theta(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_theta_call = temp_theta_call.toFixed(4);
  var temp_theta_put = 0.0;
  temp_theta_put = theta(spot, strike, riskfree, carry, maturity, volatility, -1);
  temp_theta_put = temp_theta_put.toFixed(4);
  // Rho
  var temp_rho_call = 0.0;
  temp_rho_call = rho(spot, strike, riskfree, carry, maturity, volatility, 1);
  temp_rho_call = temp_rho_call.toFixed(4);
  var temp_rho_put = 0.0;
  temp_rho_put = rho(spot, strike, riskfree, carry, maturity, volatility, -1);
  temp_rho_put = temp_rho_put.toFixed(4);

  // Display results
  // Call
  document.getElementById("call").innerHTML = temp_call;
  // Put
  document.getElementById("put").innerHTML = temp_put;
  // Delta
  document.getElementById("delta_call").innerHTML = temp_delta_call;
  document.getElementById("delta_put").innerHTML = temp_delta_put;
  // Gamma
  document.getElementById("gamma").innerHTML = temp_gamma;
  // Vega
  document.getElementById("vega").innerHTML = temp_vega;
  // Theta
  document.getElementById("theta_call").innerHTML = temp_theta_call;
  document.getElementById("theta_put").innerHTML = temp_theta_put;
  // Rho
  document.getElementById("rho_call").innerHTML = temp_rho_call;
  document.getElementById("rho_put").innerHTML = temp_rho_put;
}

// Function set_display() sets parameters text depending on the underlying instrument
function set_display(){
  if (document.getElementById("stock").checked) {
    // Set underlying spot price text
    document.getElementById("text_spot").innerHTML = 'Spot price (in SGD):';
    // Show dividend form and set dividend text
    document.getElementById("div_dividend").style.display = "block";
    document.getElementById("text_dividend").innerHTML = 'Dividend yield (in %):';
  } else if (document.getElementById("future").checked) {
    // Set underlying future price text
    document.getElementById("text_spot").innerHTML = 'Future price (in SGD):';
    // Hide dividend form
    document.getElementById("div_dividend").style.display = "none";
  } else if (document.getElementById("currency").checked) {
    // Set underlying currency spot price text
    document.getElementById("text_spot").innerHTML = 'Currency price (in SGD/USD):';
    // Set underlying currency strike price text
    document.getElementById("text_strike").innerHTML = 'Strike price (in SGD/USD):';
    // Set risk-free rate local text
    document.getElementById("text_riskfree").innerHTML = 'Risk-free rate SGD (in %):';
    // Show risk-free rate foreign form and set risk-free rate foreign text
    document.getElementById("div_dividend").style.display = "block";
    document.getElementById("text_dividend").innerHTML = 'Risk-free rate USD (in %):';
  }
}
