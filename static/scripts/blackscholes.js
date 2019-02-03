function option(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var x = 0.0;
  var y = 0.0;
  var result = 0.0;
  x = d1(spot, strike, riskfree, carry, maturity, volatility);
  y = d2(spot, strike, riskfree, carry, maturity, volatility);
  result = psi * spot * Math.exp((carry - riskfree) * maturity) * cumulative_normal(psi * x)
    - psi * strike * Math.exp(-riskfree * maturity) * cumulative_normal(psi * y);
  return result;
}

function delta(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var result = 0.0;
  var x = 0.0;
  x = d1(spot, strike, riskfree, carry, maturity, volatility);
  if (psi==1) {
    result = Math.exp((carry - riskfree) * maturity) * cumulative_normal(x);
  } else if (psi==-1) {
    result = Math.exp((carry - riskfree) * maturity) * ( cumulative_normal(x) - 1 );
  }

  return result;
}

function gamma(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var result = 0.0;
  var x = 0.0;
  x = d1(spot, strike, riskfree, carry, maturity, volatility);
  result = normal(x) * Math.exp((carry - riskfree) * maturity) / spot / volatility / Math.sqrt(maturity);
  return result;
}

function vega(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var result = 0.0;
  var x = 0.0;
  x = d1(spot, strike, riskfree, carry, maturity, volatility);
  result = spot * Math.exp((carry - riskfree) * maturity) * normal(x) * Math.sqrt(maturity);
  return result;
}

function theta(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var result = 0.0;
  var x = 0.0;
  var y = 0.0;
  x = d1(spot, strike, riskfree, carry, maturity, volatility);
  y = d2(spot, strike, riskfree, carry, maturity, volatility);
  result = -spot * Math.exp((carry - riskfree) * maturity) * normal(x) * volatility / 2 / Math.sqrt(maturity)
    - psi * (carry - riskfree) * spot * Math.exp((carry - riskfree) * maturity) * cumulative_normal(psi * x)
    - psi * riskfree * strike * Math.exp(-riskfree * maturity) * cumulative_normal(psi * y);
  return result;
}

function rho(spot, strike, riskfree, carry, maturity, volatility, psi) {
  var result = 0.0;
  var x = 0.0;
  x = d2(spot, strike, riskfree, carry, maturity, volatility);
  result = psi * maturity * strike * Math.exp(-riskfree * maturity) * cumulative_normal(psi * x);
  return result;
}

function d1(spot, strike, riskfree, carry, maturity, volatility) {
  var result = 0.0;
  var sigma = 0.0;
  sigma = volatility * Math.sqrt(maturity);
  result = (Math.log(spot / strike) + (carry + 0.5 * (volatility ** 2)) * maturity) / sigma;
  return result;
}

function d2(spot, strike, riskfree, carry, maturity, volatility) {
  var result = 0.0;
  var sigma = 0.0;
  sigma = volatility * Math.sqrt(maturity);
  result = d1(spot, strike, riskfree, carry, maturity, volatility) - sigma;
  return result;
}

function normal(x) {
  var result = 0.0;
  result = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * (x ** 2));
  return result;
}

function cumulative_normal(x) {
  //
  var result = 0.0;
  var y = 0.0;
  var exponential = 0.0;
  var sum_a = 0.0;
  var sum_b = 0.0;
  //
  y = Math.abs(x);

  if (y > 37) {
    result = 0;
  } else {
    exponential = Math.exp(-(y ** 2) / 2);
    if (y < 7.07106781186547) {
      sum_a = 0.0352624965998911 * y + 0.700383064443688;
      sum_a = sum_a * y + 6.37396220353165;
      sum_a = sum_a * y + 33.912866078383;
      sum_a = sum_a * y + 112.079291497871;
      sum_a = sum_a * y + 221.213596169931;
      sum_a = sum_a * y + 220.206867912376;
      sum_b = 0.0883883476483184 * y + 1.75566716318264;
      sum_b = sum_b * y + 16.064177579207;
      sum_b = sum_b * y + 86.7807322029461;
      sum_b = sum_b * y + 296.564248779674;
      sum_b = sum_b * y + 637.333633378831;
      sum_b = sum_b * y + 793.826512519948;
      sum_b = sum_b * y + 440.413735824752;
      result = exponential * sum_a / sum_b;
    } else {
      sum_a = y + 0.65;
      sum_a = y + 4 / sum_a;
      sum_a = y + 3 / sum_a;
      sum_a = y + 2 / sum_a;
      sum_a = y + 1 / sum_a;
      result = exponential / sum_a / 2.506628274631;
    }
  }

  if (x > 0) {
    result = 1 - result;
  }

  return result;
}
