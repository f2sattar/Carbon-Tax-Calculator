/* This app.js file contains all of the calculations for the Carbon Tax Calculator. 

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Whenever the user clicks on the refresh button for the webpage, they will be asked to confirm if they want to leave the webpage.*/
window.onbeforeunload = function () {
  return "Data will be lost if you leave the page, are you sure?";
};

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/* This function will hide the graphs until the user gets to the results section of the Carbon Tax Calculator*/
function hide_graphs() {

  /* The .style.display = "none" means that the graphs for scenarios 1, 2, and 3, and scenarios 1, and 3 will appear invisible on the webpage 
  when it loads. */
  document.getElementById("three-scenarios").style.display = "none";
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section allows the slider to show user inputs from the index.html file.

var slider = document.getElementById("sliderrange");
var hotwaterheatingtext = document.getElementById("hotwaterheatingtext");
var spaceheatingtext = document.getElementById("spaceheatingtext");
hotwaterheatingtext.innerHTML = slider.value;
spaceheatingtext.innerHTML = slider.value;

slider.oninput = function () {
  hotwaterheatingtext.innerHTML = this.value;
  spaceheatingtext.innerHTML = 100 - (this.value);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

// This section contains creates all of the buttons in the Carbon Tax Calculator.

// This button changes values in the Equipment Information table.
var changequipmentbtn = document.getElementById("change-equipment-btn");

// This is the start button for the Carbon Tax Calculator.
var startcarbontaxcalculatorbtn = document.getElementById("start-carbon-tax-calculator-btn");

// This button calculates the carbon tax after the user finishes inputting their information.
var calculatecarbontaxbtn = document.getElementById("calculate-carbon-tax-btn");

// This button goes back to the the Equipment Information section
var gobacktochangeequipmentbtn = document.getElementById("go-back-to-change-equipment-btn");

// This button clears all tables, and graphs in the carbon tax calculator.
var restartcarbontaxcalculatorbtn = document.getElementById("restart-btn");

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section will occur when the user starts the carbon tax calculator

// When the user clicks on the start button, the startcarbontaxcalculator function will begin.
startcarbontaxcalculatorbtn.addEventListener('click', startcarbontaxcalculator);

function startcarbontaxcalculator() {

  // The Start Carbon Tax Calculator section will disappear.
  document.getElementById('start-carbon-tax-calculator').style.display = "none";
  // The Equipment Information section will appear.
  document.getElementById('equipment-information-user-input').style.display = "inline";
  // The progress bar will appear.
  document.getElementById('progress-bar-user-input').style.display = "inline";

}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// Creates a function called changeequipment to run whenever the Change Equipment Information Button is hit
changequipmentbtn.addEventListener('click', changeequipment);

// Change Equipment Information Function Starts 
// After the user hits the "Change Equipment Information" button, the Current Equipment Information Table will change
function changeequipment() {

  // Checking variables
  if (
    (document.getElementById('select').value == "") ||
    (document.getElementById('natural-gas').value == "") ||
    (document.getElementById('natural-gas-cost').value == "")
  )

  {
    alert("Please fill in all of the fields, and type in 0 for any empty ones.");
  } else {

    document.getElementById('fuel-cost-escalation-user-input').style.display = "inline";
    document.getElementById('equipment-information-user-input').style.display = "none";

    // The progress goes from 0% to 25%
    $(".progress-bar").animate({
      width: "50%",
    }, 1000);
  }
}
// Change Equipment Information Function Ends

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section contains the code to go back to the Equipment Information section from the Fuel Cost Escalation / Year Information section.

// This function will occur the user clicks on the Go Back to Equipment Information button.
gobacktochangeequipmentbtn.addEventListener('click', gobacktochangeequipment);

// This function allows the user to go back to the Equipment Information section.
function gobacktochangeequipment() {

  // The Fuel Cost Escalation / Year Information section will disappear.
  document.getElementById('fuel-cost-escalation-user-input').style.display = "none";
  // The Equipment Information section will reappear.
  document.getElementById('equipment-information-user-input').style.display = "inline";

  // The progress back goes from 25% to 0%
  $(".progress-bar").animate({
    width: "0%",
  }, 1000);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// Creates a function called calculatecarbontax to run whenever the Calculate Carbon Tax Button is hit.
calculatecarbontaxbtn.addEventListener('click', calculatecarbontax);

// Change Equipment Information Function Starts 
// After the user hits the "Change Equipment Information" button, the Current Equipment Information Table will change
function calculatecarbontax() {

  /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
  // This section contains all the user inputs from the index.html file.

  // Checking variables
  if (
    (document.getElementById('space-heating-natural-gas-efficiency').value == "") ||
    (document.getElementById('dhw-natural-gas-efficiency').value == "") ||
    (document.getElementById('space-heating-electricity-efficiency').value == "") ||
    (document.getElementById('dhw-electricity-efficiency').value == "") ||
    (document.getElementById('gas-price-escalator').value == "") ||
    (document.getElementById('electricity-price-escalator').value == "") ||
    (document.getElementById('customer-gas-charge-escalator').value == "")
  )

  {
    alert("Please fill in all of the fields, and type in 0 for any empty ones.");
  } else {

    // Confirms that the user ready to see their results. 
    let confirmuser = "Are you ready to see your results?";
    if (confirm(confirmuser) == true) {

      // The progress goes from 75% to 100%
      $(".progress-bar").animate({
        width: "100%",
      }, 1000);;

      // These variables will contain the user inputs for Natural Gas Consumption
      var naturalgas = parseFloat(document.getElementById("natural-gas").value); // Natural Gas
      var naturalgascost = parseFloat(document.getElementById("natural-gas-cost").value); // Natural Gas Cost
      var carboncharge = naturalgas * 0.09789999999999999; // Carbon Charge
      var customerchargenaturalgas = 74.91*12; // Customer Charge

      // These variables will contain the user inputs for Electricity Consumption user inputs
      var electricity = parseFloat(document.getElementById("electricity").value); // Electricity
      var electricitycost = parseFloat(document.getElementById("electricity-cost").value); // Electricity Cost

      var customertype = document.getElementById("select").value;

      if (customertype == "residential") {
        var customerchargeelectricity = 40.70*12;
      }

      if (customertype == "business") {

        if (electricity <= 50){
          var customerchargeelectricity = 39.26*12;
        }

        else if (50 <= electricity <= 999){
          var customerchargeelectricity = 52.17*12;
        }

        else if (1000 <= electricity <= 4999){
          var customerchargeelectricity = 982.93*12;
        }

        else {
          var customerchargeelectricity = 4351.17*12;
        }
      }

      // These variables will contain the user inputs for Equipment Information
      var spaceheatingnaturalgaseffiencypercent = parseFloat(document.getElementById("space-heating-natural-gas-efficiency").value); // Space Heating Natural Gas Efficiency
      var dhwnaturalgasefficiencypercent = parseFloat(document.getElementById("dhw-natural-gas-efficiency").value); // DHW Natural Gas Efficiency
      var spaceheatingelectricityeffiencypercent = parseFloat(document.getElementById("space-heating-electricity-efficiency").value); // Space Heating Electricity Efficiency
      var dhwelectricityefficiencypercent = parseFloat(document.getElementById("dhw-electricity-efficiency").value); // DHW Electricity Efficiency

      // We need to convert the percent to a decimal by dividing it by 100
      var spaceheatingnaturalgaseffiency = spaceheatingnaturalgaseffiencypercent / 100;
      var dhwnaturalgasefficiency = dhwnaturalgasefficiencypercent / 100;
      var spaceheatingelectricityeffiency = spaceheatingelectricityeffiencypercent / 100;
      var dhwelectricityefficiency = dhwelectricityefficiencypercent / 100;

      // These variables will contain the user inputs for Fuel Cost Escalation / Year Information
      var gaspriceescalatorpercent = parseFloat(document.getElementById("gas-price-escalator").value); // Gas Price Escalator
      var electricitypriceescalatorpercent = parseFloat(document.getElementById("electricity-price-escalator").value); // Electricity Price Escalator
      var customergaschargeescalatorpercent = parseFloat(document.getElementById("customer-gas-charge-escalator").value); // Customer Natural Gas Charge Escalator

      // We need to convert the percent to a decimal by dividing it by 100
      var gaspriceescalator = gaspriceescalatorpercent / 100;
      var electricitypriceescalator = electricitypriceescalatorpercent / 100;
      var customergaschargeescalator = customergaschargeescalatorpercent / 100;

      // Percentage of Hot Water Heating
      var dhwheatingpercentage = parseFloat(document.getElementById("sliderrange").value);

      // We need to convert the percent to a decimal by dividing it by 100
      var dhwheating = dhwheatingpercentage / 100;

      // Percentage of Space Heating
      var spaceheatingpercentage = 100 - parseFloat(document.getElementById("sliderrange").value);

      // We need to convert the percent to a decimal by dividing it by 100
      var spaceheating = spaceheatingpercentage / 100;


      /* In this section, we are calculating the commodity charge by taking the natural gas cost, and subtracting the natural gas cost, 
      carbon charge, and customer charge from it */

      // Commodity Charge Natural Gas
      // The .value takes the value from the user input in the index.html file
      var commoditychargenaturalgas = (naturalgascost) - (carboncharge) - (customerchargenaturalgas);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // In this section, we need to do more calculations with the natural gas values
      // Estimated Annual Space Heating 
      // The estimated annual space heating is equal to all the natural gas values added together
      var estimatedannualspaceheating = naturalgas;

      // Commodity Rate
      // The commodity rate is equal to the sum of the commodity charge values being divided by the sum of the natural gas values
      var commodityrate = commoditychargenaturalgas / naturalgas;

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // This section contains all of the arrays which will contain values for the graphs
      var threescenariosscenario1array = []; // Collects data to plot the scenario 1 line in the Three Scenarios graph 
      var threescenariosscenario2array = []; // Collects data to plot the scenario 2 line in the Three Scenarios graph 
      var threescenariosscenario3array = []; // Collects data to plot the scenario 3 line in the Three Scenarios graph 

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Factors - Gas Price

      /* In this section, we are going to calculate the gas prices in the Factors section of the Carbon Tax Calculator in Excel */

      // Factors - Gas Price for 2023 to 2030
      // For 2023, we need to multiply the commodity rate with the gas price escalator value that the user inputted plus 1
      var factorsgasprice2023 = commodityrate * (1 + gaspriceescalator);

      // For 2024 to 2030, we need to multiply the previous year's gas price with the gas price escalator value plus 1
      var factorsgasprice2024 = factorsgasprice2023 * (1 + gaspriceescalator);
      var factorsgasprice2025 = factorsgasprice2024 * (1 + gaspriceescalator);
      var factorsgasprice2026 = factorsgasprice2025 * (1 + gaspriceescalator);
      var factorsgasprice2027 = factorsgasprice2026 * (1 + gaspriceescalator);
      var factorsgasprice2028 = factorsgasprice2027 * (1 + gaspriceescalator);
      var factorsgasprice2029 = factorsgasprice2028 * (1 + gaspriceescalator);
      var factorsgasprice2030 = factorsgasprice2029 * (1 + gaspriceescalator);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 1 - Gas Commodity

      /* In this section, we are going to calculate the gas commodity for the Scenario 1 Table*/

      // Creates table row with the id from index.html
      var scenario1gascommodity2023 = document.getElementById('scenario-1-gas-commodity-2023');
      var scenario1gascommodity2024 = document.getElementById('scenario-1-gas-commodity-2024');
      var scenario1gascommodity2025 = document.getElementById('scenario-1-gas-commodity-2025');
      var scenario1gascommodity2026 = document.getElementById('scenario-1-gas-commodity-2026');
      var scenario1gascommodity2027 = document.getElementById('scenario-1-gas-commodity-2027');
      var scenario1gascommodity2028 = document.getElementById('scenario-1-gas-commodity-2028');
      var scenario1gascommodity2029 = document.getElementById('scenario-1-gas-commodity-2029');
      var scenario1gascommodity2030 = document.getElementById('scenario-1-gas-commodity-2030');

      // We can get the gas commodity values for 2023 to 2030 by multiplying the sum of the natural gas by the gas price
      var scenario1gascommodity2023value = naturalgas * factorsgasprice2023;
      var scenario1gascommodity2024value = naturalgas * factorsgasprice2024;
      var scenario1gascommodity2025value = naturalgas * factorsgasprice2025;
      var scenario1gascommodity2026value = naturalgas * factorsgasprice2026;
      var scenario1gascommodity2027value = naturalgas * factorsgasprice2027;
      var scenario1gascommodity2028value = naturalgas * factorsgasprice2028;
      var scenario1gascommodity2029value = naturalgas * factorsgasprice2029;
      var scenario1gascommodity2030value = naturalgas * factorsgasprice2030;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario1gascommodity2023.innerText = "$" + parseInt(scenario1gascommodity2023value);
      scenario1gascommodity2024.innerText = "$" + parseInt(scenario1gascommodity2024value);
      scenario1gascommodity2025.innerText = "$" + parseInt(scenario1gascommodity2025value);
      scenario1gascommodity2026.innerText = "$" + parseInt(scenario1gascommodity2026value);
      scenario1gascommodity2027.innerText = "$" + parseInt(scenario1gascommodity2027value);
      scenario1gascommodity2028.innerText = "$" + parseInt(scenario1gascommodity2028value);
      scenario1gascommodity2029.innerText = "$" + parseInt(scenario1gascommodity2029value);
      scenario1gascommodity2030.innerText = "$" + parseInt(scenario1gascommodity2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 1 - Carbon Charge

      /* In this section, we are going to calculate the carbon charge for the Scenario 1 Table*/

      // Creates table row with the id from index.html
      var scenario1carbonprice2023 = document.getElementById('scenario-1-carbon-price-2023');
      var scenario1carbonprice2024 = document.getElementById('scenario-1-carbon-price-2024');
      var scenario1carbonprice2025 = document.getElementById('scenario-1-carbon-price-2025');
      var scenario1carbonprice2026 = document.getElementById('scenario-1-carbon-price-2026');
      var scenario1carbonprice2027 = document.getElementById('scenario-1-carbon-price-2027');
      var scenario1carbonprice2028 = document.getElementById('scenario-1-carbon-price-2028');
      var scenario1carbonprice2029 = document.getElementById('scenario-1-carbon-price-2029');
      var scenario1carbonprice2030 = document.getElementById('scenario-1-carbon-price-2030');

      /* We can get the carbon charge values for 2023 to 2030 by multiplying the carbon price which is 65, 80, 95, 110, 125, 140, 155, and 170
      by 0.179392 tCO₂/MWh, 10.62778 to convert m3 to kWh divided by 1000, the sum of natural gas totals */
      var scenario1carbonprice2023value = 65 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2024value = 80 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2025value = 95 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2026value = 110 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2027value = 125 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2028value = 140 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2029value = 155 * 0.179392 * (10.62778 / 1000) * naturalgas;
      var scenario1carbonprice2030value = 170 * 0.179392 * (10.62778 / 1000) * naturalgas;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario1carbonprice2023.innerText = "$" + parseInt(scenario1carbonprice2023value);
      scenario1carbonprice2024.innerText = "$" + parseInt(scenario1carbonprice2024value);
      scenario1carbonprice2025.innerText = "$" + parseInt(scenario1carbonprice2025value);
      scenario1carbonprice2026.innerText = "$" + parseInt(scenario1carbonprice2026value);
      scenario1carbonprice2027.innerText = "$" + parseInt(scenario1carbonprice2027value);
      scenario1carbonprice2028.innerText = "$" + parseInt(scenario1carbonprice2028value);
      scenario1carbonprice2029.innerText = "$" + parseInt(scenario1carbonprice2029value);
      scenario1carbonprice2030.innerText = "$" + parseInt(scenario1carbonprice2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 1 - Customer Gas Charge

      /* In this section, we are going to calculate the customer gas charge for the Scenario 1 Table*/

      // Creates table row with the id from index.html
      var scenario1customergascharge2023 = document.getElementById('scenario-1-customer-gas-charge-2023');
      var scenario1customergascharge2024 = document.getElementById('scenario-1-customer-gas-charge-2024');
      var scenario1customergascharge2025 = document.getElementById('scenario-1-customer-gas-charge-2025');
      var scenario1customergascharge2026 = document.getElementById('scenario-1-customer-gas-charge-2026');
      var scenario1customergascharge2027 = document.getElementById('scenario-1-customer-gas-charge-2027');
      var scenario1customergascharge2028 = document.getElementById('scenario-1-customer-gas-charge-2028');
      var scenario1customergascharge2029 = document.getElementById('scenario-1-customer-gas-charge-2029');
      var scenario1customergascharge2030 = document.getElementById('scenario-1-customer-gas-charge-2030');

      // Factors - Gas Price for 2023 to 2030
      // For 2023, we need to multiply the annual service charges with the electricity price escalator value that the user inputted plus 1
      var scenario1customergascharge2023value = customerchargenaturalgas * (1 + electricitypriceescalator);

      // For 2024 to 2030, we need to multiply the previous year's customer gas charge with the electricity price escalator value plus 1
      var scenario1customergascharge2024value = scenario1customergascharge2023value * (1 + electricitypriceescalator);
      var scenario1customergascharge2025value = scenario1customergascharge2024value * (1 + electricitypriceescalator);
      var scenario1customergascharge2026value = scenario1customergascharge2025value * (1 + electricitypriceescalator);
      var scenario1customergascharge2027value = scenario1customergascharge2026value * (1 + electricitypriceescalator);
      var scenario1customergascharge2028value = scenario1customergascharge2027value * (1 + electricitypriceescalator);
      var scenario1customergascharge2029value = scenario1customergascharge2028value * (1 + electricitypriceescalator);
      var scenario1customergascharge2030value = scenario1customergascharge2029value * (1 + electricitypriceescalator);

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario1customergascharge2023.innerText = "$" + parseInt(scenario1customergascharge2023value);
      scenario1customergascharge2024.innerText = "$" + parseInt(scenario1customergascharge2024value);
      scenario1customergascharge2025.innerText = "$" + parseInt(scenario1customergascharge2025value);
      scenario1customergascharge2026.innerText = "$" + parseInt(scenario1customergascharge2026value);
      scenario1customergascharge2027.innerText = "$" + parseInt(scenario1customergascharge2027value);
      scenario1customergascharge2028.innerText = "$" + parseInt(scenario1customergascharge2028value);
      scenario1customergascharge2029.innerText = "$" + parseInt(scenario1customergascharge2029value);
      scenario1customergascharge2030.innerText = "$" + parseInt(scenario1customergascharge2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 1 - Total

      /* In this section, we are going to calculate the scenario 1 total for 2023 to 2030 for the Scenario 1 Table*/

      // Creates table row with the id from index.html
      var scenario1total2023 = document.getElementById('scenario-1-total-2023');
      var scenario1total2024 = document.getElementById('scenario-1-total-2024');
      var scenario1total2025 = document.getElementById('scenario-1-total-2025');
      var scenario1total2026 = document.getElementById('scenario-1-total-2026');
      var scenario1total2027 = document.getElementById('scenario-1-total-2027');
      var scenario1total2028 = document.getElementById('scenario-1-total-2028');
      var scenario1total2029 = document.getElementById('scenario-1-total-2029');
      var scenario1total2030 = document.getElementById('scenario-1-total-2030');

      // We need to add the gas commodity, carbon price, and cutomer gas charge together to get the total values for 2023 to 2030
      var scenario1total2023total = scenario1gascommodity2023value + scenario1carbonprice2023value + scenario1customergascharge2023value;
      var scenario1total2024total = scenario1gascommodity2024value + scenario1carbonprice2024value + scenario1customergascharge2024value;
      var scenario1total2025total = scenario1gascommodity2025value + scenario1carbonprice2025value + scenario1customergascharge2025value;
      var scenario1total2026total = scenario1gascommodity2026value + scenario1carbonprice2026value + scenario1customergascharge2026value;
      var scenario1total2027total = scenario1gascommodity2027value + scenario1carbonprice2027value + scenario1customergascharge2027value;
      var scenario1total2028total = scenario1gascommodity2028value + scenario1carbonprice2028value + scenario1customergascharge2028value;
      var scenario1total2029total = scenario1gascommodity2029value + scenario1carbonprice2029value + scenario1customergascharge2029value;
      var scenario1total2030total = scenario1gascommodity2030value + scenario1carbonprice2030value + scenario1customergascharge2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario1total2023.innerText = "$" + parseInt(scenario1total2023total);
      scenario1total2024.innerText = "$" + parseInt(scenario1total2024total);
      scenario1total2025.innerText = "$" + parseInt(scenario1total2025total);
      scenario1total2026.innerText = "$" + parseInt(scenario1total2026total);
      scenario1total2027.innerText = "$" + parseInt(scenario1total2027total);
      scenario1total2028.innerText = "$" + parseInt(scenario1total2028total);
      scenario1total2029.innerText = "$" + parseInt(scenario1total2029total);
      scenario1total2030.innerText = "$" + parseInt(scenario1total2030total);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Electric Heat Pump

      /* In this section, we are going to calculate the Electric Heat Pump (kWh) for Scenario 2 */

      // We need to get the heat pump COP for scenario 2 which is the space heating efficiency
      var heatpumpcop = spaceheatingelectricityeffiency;

      // We need to get the boiler efficiency for scenario 2 which is the space heating efficiency
      var boilerefficiency = spaceheatingnaturalgaseffiency;

      /* To calculate the electric heat pump, we need to multiple the estimated annual space heating by the boiler efficiency in scenario 2,
      and 10.6277777770556. Then divide it by the heat pump cop in scenario 2 */
      var electricheatpump = (estimatedannualspaceheating * boilerefficiency * (10.6277777770556)) / heatpumpcop;

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Gas Commodity

      /* In this section, we are going to calculate the gas commodity for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2gascommodity2023 = document.getElementById('scenario-2-gas-commodity-2023');
      var scenario2gascommodity2024 = document.getElementById('scenario-2-gas-commodity-2024');
      var scenario2gascommodity2025 = document.getElementById('scenario-2-gas-commodity-2025');
      var scenario2gascommodity2026 = document.getElementById('scenario-2-gas-commodity-2026');
      var scenario2gascommodity2027 = document.getElementById('scenario-2-gas-commodity-2027');
      var scenario2gascommodity2028 = document.getElementById('scenario-2-gas-commodity-2028');
      var scenario2gascommodity2029 = document.getElementById('scenario-2-gas-commodity-2029');
      var scenario2gascommodity2030 = document.getElementById('scenario-2-gas-commodity-2030');

      /* We need to add the gas price, and multiply it by the natural gas total subtracted by the estimated annual space heating
       to get the gas commodity for 2023 to 2030 */
      var scenario2gascommodity2023value = scenario1gascommodity2023value * dhwheating;
      var scenario2gascommodity2024value = scenario1gascommodity2024value * dhwheating;
      var scenario2gascommodity2025value = scenario1gascommodity2025value * dhwheating;
      var scenario2gascommodity2026value = scenario1gascommodity2026value * dhwheating;
      var scenario2gascommodity2027value = scenario1gascommodity2027value * dhwheating;
      var scenario2gascommodity2028value = scenario1gascommodity2028value * dhwheating;
      var scenario2gascommodity2029value = scenario1gascommodity2029value * dhwheating;
      var scenario2gascommodity2030value = scenario1gascommodity2030value * dhwheating;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2gascommodity2023.innerText = "$" + parseInt(scenario2gascommodity2023value);
      scenario2gascommodity2024.innerText = "$" + parseInt(scenario2gascommodity2024value);
      scenario2gascommodity2025.innerText = "$" + parseInt(scenario2gascommodity2025value);
      scenario2gascommodity2026.innerText = "$" + parseInt(scenario2gascommodity2026value);
      scenario2gascommodity2027.innerText = "$" + parseInt(scenario2gascommodity2027value);
      scenario2gascommodity2028.innerText = "$" + parseInt(scenario2gascommodity2028value);
      scenario2gascommodity2029.innerText = "$" + parseInt(scenario2gascommodity2029value);
      scenario2gascommodity2030.innerText = "$" + parseInt(scenario2gascommodity2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Carbon Price

      /* In this section, we are going to calculate the carbon price for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2carbonprice2023 = document.getElementById('scenario-2-carbon-price-2023');
      var scenario2carbonprice2024 = document.getElementById('scenario-2-carbon-price-2024');
      var scenario2carbonprice2025 = document.getElementById('scenario-2-carbon-price-2025');
      var scenario2carbonprice2026 = document.getElementById('scenario-2-carbon-price-2026');
      var scenario2carbonprice2027 = document.getElementById('scenario-2-carbon-price-2027');
      var scenario2carbonprice2028 = document.getElementById('scenario-2-carbon-price-2028');
      var scenario2carbonprice2029 = document.getElementById('scenario-2-carbon-price-2029');
      var scenario2carbonprice2030 = document.getElementById('scenario-2-carbon-price-2030');

      /* We need to divide 10.6277777770556 by 1000, multiply it by 0.179392326, and then multiply it by 65, 80, 95, 110, 125, 140, 155, and 170.
      Then we need to multiply the value by the sum of the natural gas values subtracted by the estimated annual space heating total */
      var scenario2carbonprice2023value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2024value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2025value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2026value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2027value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2028value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2029value = scenario1carbonprice2023value * dhwheating;
      var scenario2carbonprice2030value = scenario1carbonprice2023value * dhwheating;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2carbonprice2023.innerText = "$" + parseInt(scenario2carbonprice2023value);
      scenario2carbonprice2024.innerText = "$" + parseInt(scenario2carbonprice2024value);
      scenario2carbonprice2025.innerText = "$" + parseInt(scenario2carbonprice2025value);
      scenario2carbonprice2026.innerText = "$" + parseInt(scenario2carbonprice2026value);
      scenario2carbonprice2027.innerText = "$" + parseInt(scenario2carbonprice2027value);
      scenario2carbonprice2028.innerText = "$" + parseInt(scenario2carbonprice2028value);
      scenario2carbonprice2029.innerText = "$" + parseInt(scenario2carbonprice2029value);
      scenario2carbonprice2030.innerText = "$" + parseInt(scenario2carbonprice2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Customer

      /* In this section, we are going to calculate the customer charge for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2customer2023 = document.getElementById('scenario-2-customer-2023');
      var scenario2customer2024 = document.getElementById('scenario-2-customer-2024');
      var scenario2customer2025 = document.getElementById('scenario-2-customer-2025');
      var scenario2customer2026 = document.getElementById('scenario-2-customer-2026');
      var scenario2customer2027 = document.getElementById('scenario-2-customer-2027');
      var scenario2customer2028 = document.getElementById('scenario-2-customer-2028');
      var scenario2customer2029 = document.getElementById('scenario-2-customer-2029');
      var scenario2customer2030 = document.getElementById('scenario-2-customer-2030');

      // The customer gas charge for scenario 2 is the same as scenario 1
      var scenario2customer2023value = scenario1customergascharge2023value;
      var scenario2customer2024value = scenario1customergascharge2024value;
      var scenario2customer2025value = scenario1customergascharge2025value;
      var scenario2customer2026value = scenario1customergascharge2026value;
      var scenario2customer2027value = scenario1customergascharge2027value;
      var scenario2customer2028value = scenario1customergascharge2028value;
      var scenario2customer2029value = scenario1customergascharge2029value;
      var scenario2customer2030value = scenario1customergascharge2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2customer2023.innerText = "$" + parseInt(scenario2customer2023value);
      scenario2customer2024.innerText = "$" + parseInt(scenario2customer2024value);
      scenario2customer2025.innerText = "$" + parseInt(scenario2customer2025value);
      scenario2customer2026.innerText = "$" + parseInt(scenario2customer2026value);
      scenario2customer2027.innerText = "$" + parseInt(scenario2customer2027value);
      scenario2customer2028.innerText = "$" + parseInt(scenario2customer2028value);
      scenario2customer2029.innerText = "$" + parseInt(scenario2customer2029value);
      scenario2customer2030.innerText = "$" + parseInt(scenario2customer2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Gas Total

      /* In this section, we are going to calculate the gas total for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2gastotal2023 = document.getElementById('scenario-2-gas-total-2023');
      var scenario2gastotal2024 = document.getElementById('scenario-2-gas-total-2024');
      var scenario2gastotal2025 = document.getElementById('scenario-2-gas-total-2025');
      var scenario2gastotal2026 = document.getElementById('scenario-2-gas-total-2026');
      var scenario2gastotal2027 = document.getElementById('scenario-2-gas-total-2027');
      var scenario2gastotal2028 = document.getElementById('scenario-2-gas-total-2028');
      var scenario2gastotal2029 = document.getElementById('scenario-2-gas-total-2029');
      var scenario2gastotal2030 = document.getElementById('scenario-2-gas-total-2030');

      // We need to add the gas commodity, carbon price, and customer charge to get the scenario 2 total
      var scenario2gastotal2023total = scenario2gascommodity2023value + scenario2carbonprice2023value + scenario2customer2023value;
      var scenario2gastotal2024total = scenario2gascommodity2024value + scenario2carbonprice2024value + scenario2customer2024value;
      var scenario2gastotal2025total = scenario2gascommodity2025value + scenario2carbonprice2025value + scenario2customer2025value;
      var scenario2gastotal2026total = scenario2gascommodity2026value + scenario2carbonprice2026value + scenario2customer2026value;
      var scenario2gastotal2027total = scenario2gascommodity2027value + scenario2carbonprice2027value + scenario2customer2027value;
      var scenario2gastotal2028total = scenario2gascommodity2028value + scenario2carbonprice2028value + scenario2customer2028value;
      var scenario2gastotal2029total = scenario2gascommodity2029value + scenario2carbonprice2029value + scenario2customer2029value;
      var scenario2gastotal2030total = scenario2gascommodity2030value + scenario2carbonprice2030value + scenario2customer2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2gastotal2023.innerText = "$" + parseInt(scenario2gastotal2023total);
      scenario2gastotal2024.innerText = "$" + parseInt(scenario2gastotal2024total);
      scenario2gastotal2025.innerText = "$" + parseInt(scenario2gastotal2025total);
      scenario2gastotal2026.innerText = "$" + parseInt(scenario2gastotal2026total);
      scenario2gastotal2027.innerText = "$" + parseInt(scenario2gastotal2027total);
      scenario2gastotal2028.innerText = "$" + parseInt(scenario2gastotal2028total);
      scenario2gastotal2029.innerText = "$" + parseInt(scenario2gastotal2029total);
      scenario2gastotal2030.innerText = "$" + parseInt(scenario2gastotal2030total);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Factors - Electricity Price

      /* In this section, we are going to calculate the electricity price for 2023 to 2030 for the Factors Table*/

      // Factors - Electricity Price for 2023 to 2030
      // For 2023, we need to multiply the marginal rate with the electricity price escalator value that the user inputted plus 1

      var commoditychargeelectricity = electricitycost - customerchargeelectricity;
      var marginalrate = commoditychargeelectricity / electricity;
      var factorselectricityprice2023 = marginalrate * (1 + electricitypriceescalator);

      // For 2024 to 2030, we need to multiply the previous year's electricity price with the electricity price escalator value plus 1
      var factorselectricityprice2024 = factorselectricityprice2023 * (1 + electricitypriceescalator);
      var factorselectricityprice2025 = factorselectricityprice2024 * (1 + electricitypriceescalator);
      var factorselectricityprice2026 = factorselectricityprice2025 * (1 + electricitypriceescalator);
      var factorselectricityprice2027 = factorselectricityprice2026 * (1 + electricitypriceescalator);
      var factorselectricityprice2028 = factorselectricityprice2027 * (1 + electricitypriceescalator);
      var factorselectricityprice2029 = factorselectricityprice2028 * (1 + electricitypriceescalator);
      var factorselectricityprice2030 = factorselectricityprice2029 * (1 + electricitypriceescalator);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Electricity Commodity

      /* In this section, we are going to calculate the electricity commodity for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2electricitycommodity2023 = document.getElementById('scenario-2-electricity-commodity-2023');
      var scenario2electricitycommodity2024 = document.getElementById('scenario-2-electricity-commodity-2024');
      var scenario2electricitycommodity2025 = document.getElementById('scenario-2-electricity-commodity-2025');
      var scenario2electricitycommodity2026 = document.getElementById('scenario-2-electricity-commodity-2026');
      var scenario2electricitycommodity2027 = document.getElementById('scenario-2-electricity-commodity-2027');
      var scenario2electricitycommodity2028 = document.getElementById('scenario-2-electricity-commodity-2028');
      var scenario2electricitycommodity2029 = document.getElementById('scenario-2-electricity-commodity-2029');
      var scenario2electricitycommodity2030 = document.getElementById('scenario-2-electricity-commodity-2030');

      // We need to multiple the electric heat pump by the electric pump
      var scenario2electricitycommodity2023value = electricheatpump * factorselectricityprice2023 * spaceheating;
      var scenario2electricitycommodity2024value = electricheatpump * factorselectricityprice2024 * spaceheating;
      var scenario2electricitycommodity2025value = electricheatpump * factorselectricityprice2025 * spaceheating;
      var scenario2electricitycommodity2026value = electricheatpump * factorselectricityprice2026 * spaceheating;
      var scenario2electricitycommodity2027value = electricheatpump * factorselectricityprice2027 * spaceheating;
      var scenario2electricitycommodity2028value = electricheatpump * factorselectricityprice2028 * spaceheating;
      var scenario2electricitycommodity2029value = electricheatpump * factorselectricityprice2029 * spaceheating;
      var scenario2electricitycommodity2030value = electricheatpump * factorselectricityprice2030 * spaceheating;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2electricitycommodity2023.innerText = "$" + parseInt(scenario2electricitycommodity2023value);
      scenario2electricitycommodity2024.innerText = "$" + parseInt(scenario2electricitycommodity2024value);
      scenario2electricitycommodity2025.innerText = "$" + parseInt(scenario2electricitycommodity2025value);
      scenario2electricitycommodity2026.innerText = "$" + parseInt(scenario2electricitycommodity2026value);
      scenario2electricitycommodity2027.innerText = "$" + parseInt(scenario2electricitycommodity2027value);
      scenario2electricitycommodity2028.innerText = "$" + parseInt(scenario2electricitycommodity2028value);
      scenario2electricitycommodity2029.innerText = "$" + parseInt(scenario2electricitycommodity2029value);
      scenario2electricitycommodity2030.innerText = "$" + parseInt(scenario2electricitycommodity2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Total

      /* In this section, we are going to calculate the total for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2total2023 = document.getElementById('scenario-2-total-2023');
      var scenario2total2024 = document.getElementById('scenario-2-total-2024');
      var scenario2total2025 = document.getElementById('scenario-2-total-2025');
      var scenario2total2026 = document.getElementById('scenario-2-total-2026');
      var scenario2total2027 = document.getElementById('scenario-2-total-2027');
      var scenario2total2028 = document.getElementById('scenario-2-total-2028');
      var scenario2total2029 = document.getElementById('scenario-2-total-2029');
      var scenario2total2030 = document.getElementById('scenario-2-total-2030');

      // We need to add the gas total and electricity commodity cost together
      var scenario2total2023total = scenario2electricitycommodity2023value + scenario2gastotal2023total;
      var scenario2total2024total = scenario2electricitycommodity2024value + scenario2gastotal2024total;
      var scenario2total2025total = scenario2electricitycommodity2025value + scenario2gastotal2025total;
      var scenario2total2026total = scenario2electricitycommodity2026value + scenario2gastotal2026total;
      var scenario2total2027total = scenario2electricitycommodity2027value + scenario2gastotal2027total;
      var scenario2total2028total = scenario2electricitycommodity2028value + scenario2gastotal2028total;
      var scenario2total2029total = scenario2electricitycommodity2029value + scenario2gastotal2029total;
      var scenario2total2030total = scenario2electricitycommodity2030value + scenario2gastotal2030total;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2total2023.innerText = "$" + parseInt(scenario2total2023total);
      scenario2total2024.innerText = "$" + parseInt(scenario2total2024total);
      scenario2total2025.innerText = "$" + parseInt(scenario2total2025total);
      scenario2total2026.innerText = "$" + parseInt(scenario2total2026total);
      scenario2total2027.innerText = "$" + parseInt(scenario2total2027total);
      scenario2total2028.innerText = "$" + parseInt(scenario2total2028total);
      scenario2total2029.innerText = "$" + parseInt(scenario2total2029total);
      scenario2total2030.innerText = "$" + parseInt(scenario2total2030total);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Cash Flow

      /* In this section, we are going to calculate the cash flow for 2023 to 2030 for the Scenario 2 Table*/

      // Creates table row with the id from index.html
      var scenario2cashflow2023 = document.getElementById('scenario-2-cash-flow-2023');
      var scenario2cashflow2024 = document.getElementById('scenario-2-cash-flow-2024');
      var scenario2cashflow2025 = document.getElementById('scenario-2-cash-flow-2025');
      var scenario2cashflow2026 = document.getElementById('scenario-2-cash-flow-2026');
      var scenario2cashflow2027 = document.getElementById('scenario-2-cash-flow-2027');
      var scenario2cashflow2028 = document.getElementById('scenario-2-cash-flow-2028');
      var scenario2cashflow2029 = document.getElementById('scenario-2-cash-flow-2029');
      var scenario2cashflow2030 = document.getElementById('scenario-2-cash-flow-2030');

      // Subtract the scenario 2 total from the scenario 1 total
      var scenario2cashflow2023value = scenario1total2023total - scenario2total2023total;
      var scenario2cashflow2024value = scenario1total2024total - scenario2total2024total;
      var scenario2cashflow2025value = scenario1total2025total - scenario2total2025total;
      var scenario2cashflow2026value = scenario1total2026total - scenario2total2026total;
      var scenario2cashflow2027value = scenario1total2027total - scenario2total2027total;
      var scenario2cashflow2028value = scenario1total2028total - scenario2total2028total;
      var scenario2cashflow2029value = scenario1total2029total - scenario2total2029total;
      var scenario2cashflow2030value = scenario1total2030total - scenario2total2030total;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2cashflow2023.innerText = "$" + parseInt(scenario2cashflow2023value);
      scenario2cashflow2024.innerText = "$" + parseInt(scenario2cashflow2024value);
      scenario2cashflow2025.innerText = "$" + parseInt(scenario2cashflow2025value);
      scenario2cashflow2026.innerText = "$" + parseInt(scenario2cashflow2026value);
      scenario2cashflow2027.innerText = "$" + parseInt(scenario2cashflow2027value);
      scenario2cashflow2028.innerText = "$" + parseInt(scenario2cashflow2028value);
      scenario2cashflow2029.innerText = "$" + parseInt(scenario2cashflow2029value);
      scenario2cashflow2030.innerText = "$" + parseInt(scenario2cashflow2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 2 - Year Over Year

      /* In this section, we are going to calculate the year over year for 2023 to 2030 for the Scenario 3 Table*/

      // Creates table row with the id from index.html
      var scenario2yearoveryear2023 = document.getElementById('scenario-2-year-over-year-2023');
      var scenario2yearoveryear2024 = document.getElementById('scenario-2-year-over-year-2024');
      var scenario2yearoveryear2025 = document.getElementById('scenario-2-year-over-year-2025');
      var scenario2yearoveryear2026 = document.getElementById('scenario-2-year-over-year-2026');
      var scenario2yearoveryear2027 = document.getElementById('scenario-2-year-over-year-2027');
      var scenario2yearoveryear2028 = document.getElementById('scenario-2-year-over-year-2028');
      var scenario2yearoveryear2029 = document.getElementById('scenario-2-year-over-year-2029');
      var scenario2yearoveryear2030 = document.getElementById('scenario-2-year-over-year-2030');

      // Add the previous year over year with the current year cash flow
      var scenario2yearoveryear2023value = scenario2cashflow2023value;
      var scenario2yearoveryear2024value = scenario2yearoveryear2023value + scenario2cashflow2024value;
      var scenario2yearoveryear2025value = scenario2yearoveryear2024value + scenario2cashflow2025value;
      var scenario2yearoveryear2026value = scenario2yearoveryear2025value + scenario2cashflow2026value;
      var scenario2yearoveryear2027value = scenario2yearoveryear2026value + scenario2cashflow2027value;
      var scenario2yearoveryear2028value = scenario2yearoveryear2027value + scenario2cashflow2028value;
      var scenario2yearoveryear2029value = scenario2yearoveryear2028value + scenario2cashflow2029value;
      var scenario2yearoveryear2030value = scenario2yearoveryear2029value + scenario2cashflow2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario2yearoveryear2023.innerText = "$" + parseInt(scenario2yearoveryear2023value);
      scenario2yearoveryear2024.innerText = "$" + parseInt(scenario2yearoveryear2024value);
      scenario2yearoveryear2025.innerText = "$" + parseInt(scenario2yearoveryear2025value);
      scenario2yearoveryear2026.innerText = "$" + parseInt(scenario2yearoveryear2026value);
      scenario2yearoveryear2027.innerText = "$" + parseInt(scenario2yearoveryear2027value);
      scenario2yearoveryear2028.innerText = "$" + parseInt(scenario2yearoveryear2028value);
      scenario2yearoveryear2029.innerText = "$" + parseInt(scenario2yearoveryear2029value);
      scenario2yearoveryear2030.innerText = "$" + parseInt(scenario2yearoveryear2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 3 - Electricity Commodity

      /* In this section, we are going to calculate the electricity commodity for 2023 to 2030 for the Scenario 3 Table*/

      // Creates table row with the id from index.html
      var scenario3electricitycommodity2023 = document.getElementById('scenario-3-electricity-commodity-2023');
      var scenario3electricitycommodity2024 = document.getElementById('scenario-3-electricity-commodity-2024');
      var scenario3electricitycommodity2025 = document.getElementById('scenario-3-electricity-commodity-2025');
      var scenario3electricitycommodity2026 = document.getElementById('scenario-3-electricity-commodity-2026');
      var scenario3electricitycommodity2027 = document.getElementById('scenario-3-electricity-commodity-2027');
      var scenario3electricitycommodity2028 = document.getElementById('scenario-3-electricity-commodity-2028');
      var scenario3electricitycommodity2029 = document.getElementById('scenario-3-electricity-commodity-2029');
      var scenario3electricitycommodity2030 = document.getElementById('scenario-3-electricity-commodity-2030');

      // We need to multiply the electric heat pump by the electricity price
      var scenario3electricitycommodity2023value = electricheatpump * factorselectricityprice2023;
      var scenario3electricitycommodity2024value = electricheatpump * factorselectricityprice2024;
      var scenario3electricitycommodity2025value = electricheatpump * factorselectricityprice2025;
      var scenario3electricitycommodity2026value = electricheatpump * factorselectricityprice2026;
      var scenario3electricitycommodity2027value = electricheatpump * factorselectricityprice2027;
      var scenario3electricitycommodity2028value = electricheatpump * factorselectricityprice2028;
      var scenario3electricitycommodity2029value = electricheatpump * factorselectricityprice2029;
      var scenario3electricitycommodity2030value = electricheatpump * factorselectricityprice2030;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario3electricitycommodity2023.innerText = "$" + parseInt(scenario3electricitycommodity2023value);
      scenario3electricitycommodity2024.innerText = "$" + parseInt(scenario3electricitycommodity2024value);
      scenario3electricitycommodity2025.innerText = "$" + parseInt(scenario3electricitycommodity2025value);
      scenario3electricitycommodity2026.innerText = "$" + parseInt(scenario3electricitycommodity2026value);
      scenario3electricitycommodity2027.innerText = "$" + parseInt(scenario3electricitycommodity2027value);
      scenario3electricitycommodity2028.innerText = "$" + parseInt(scenario3electricitycommodity2028value);
      scenario3electricitycommodity2029.innerText = "$" + parseInt(scenario3electricitycommodity2029value);
      scenario3electricitycommodity2030.innerText = "$" + parseInt(scenario3electricitycommodity2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 3 - Total 

      /* In this section, we are going to calculate the total for 2023 to 2030 for the Scenario 3 Table*/

      // Creates table row with the id from index.html
      var scenario3total2023 = document.getElementById('scenario-3-total-2023');
      var scenario3total2024 = document.getElementById('scenario-3-total-2024');
      var scenario3total2025 = document.getElementById('scenario-3-total-2025');
      var scenario3total2026 = document.getElementById('scenario-3-total-2026');
      var scenario3total2027 = document.getElementById('scenario-3-total-2027');
      var scenario3total2028 = document.getElementById('scenario-3-total-2028');
      var scenario3total2029 = document.getElementById('scenario-3-total-2029');
      var scenario3total2030 = document.getElementById('scenario-3-total-2030');

      // The total amount for scenario 3 is the electricity commodity
      var scenario3total2023total = scenario3electricitycommodity2023value;
      var scenario3total2024total = scenario3electricitycommodity2024value;
      var scenario3total2025total = scenario3electricitycommodity2025value;
      var scenario3total2026total = scenario3electricitycommodity2026value;
      var scenario3total2027total = scenario3electricitycommodity2027value;
      var scenario3total2028total = scenario3electricitycommodity2028value;
      var scenario3total2029total = scenario3electricitycommodity2029value;
      var scenario3total2030total = scenario3electricitycommodity2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario3total2023.innerText = "$" + parseInt(scenario3total2023total);
      scenario3total2024.innerText = "$" + parseInt(scenario3total2024total);
      scenario3total2025.innerText = "$" + parseInt(scenario3total2025total);
      scenario3total2026.innerText = "$" + parseInt(scenario3total2026total);
      scenario3total2027.innerText = "$" + parseInt(scenario3total2027total);
      scenario3total2028.innerText = "$" + parseInt(scenario3total2028total);
      scenario3total2029.innerText = "$" + parseInt(scenario3total2029total);
      scenario3total2030.innerText = "$" + parseInt(scenario3total2030total);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 3 - Cash Flow

      /* In this section, we are going to calculate the cash flow for 2023 to 2030 for the Scenario 3 Table*/

      // Creates table row with the id from index.html
      var scenario3cashflow2023 = document.getElementById('scenario-3-cash-flow-2023');
      var scenario3cashflow2024 = document.getElementById('scenario-3-cash-flow-2024');
      var scenario3cashflow2025 = document.getElementById('scenario-3-cash-flow-2025');
      var scenario3cashflow2026 = document.getElementById('scenario-3-cash-flow-2026');
      var scenario3cashflow2027 = document.getElementById('scenario-3-cash-flow-2027');
      var scenario3cashflow2028 = document.getElementById('scenario-3-cash-flow-2028');
      var scenario3cashflow2029 = document.getElementById('scenario-3-cash-flow-2029');
      var scenario3cashflow2030 = document.getElementById('scenario-3-cash-flow-2030');

      // Subtract the total from scenerio 3 from the total in scenario 1 
      var scenario3cashflow2023value = scenario1total2023total - scenario3total2023total;
      var scenario3cashflow2024value = scenario1total2024total - scenario3total2024total;
      var scenario3cashflow2025value = scenario1total2025total - scenario3total2025total;
      var scenario3cashflow2026value = scenario1total2026total - scenario3total2026total;
      var scenario3cashflow2027value = scenario1total2027total - scenario3total2027total;
      var scenario3cashflow2028value = scenario1total2028total - scenario3total2028total;
      var scenario3cashflow2029value = scenario1total2029total - scenario3total2029total;
      var scenario3cashflow2030value = scenario1total2030total - scenario3total2030total;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario3cashflow2023.innerText = "$" + parseInt(scenario3cashflow2023value);
      scenario3cashflow2024.innerText = "$" + parseInt(scenario3cashflow2024value);
      scenario3cashflow2025.innerText = "$" + parseInt(scenario3cashflow2025value);
      scenario3cashflow2026.innerText = "$" + parseInt(scenario3cashflow2026value);
      scenario3cashflow2027.innerText = "$" + parseInt(scenario3cashflow2027value);
      scenario3cashflow2028.innerText = "$" + parseInt(scenario3cashflow2028value);
      scenario3cashflow2029.innerText = "$" + parseInt(scenario3cashflow2029value);
      scenario3cashflow2030.innerText = "$" + parseInt(scenario3cashflow2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Scenario 3 - Year Over Year

      /* In this section, we are going to calculate the year over year for 2023 to 2030 for the Scenario 3 Table*/

      // Creates table row with the id from index.html
      var scenario3yearoveryear2023 = document.getElementById('scenario-3-year-over-year-2023');
      var scenario3yearoveryear2024 = document.getElementById('scenario-3-year-over-year-2024');
      var scenario3yearoveryear2025 = document.getElementById('scenario-3-year-over-year-2025');
      var scenario3yearoveryear2026 = document.getElementById('scenario-3-year-over-year-2026');
      var scenario3yearoveryear2027 = document.getElementById('scenario-3-year-over-year-2027');
      var scenario3yearoveryear2028 = document.getElementById('scenario-3-year-over-year-2028');
      var scenario3yearoveryear2029 = document.getElementById('scenario-3-year-over-year-2029');
      var scenario3yearoveryear2030 = document.getElementById('scenario-3-year-over-year-2030');

      // Add the previous year over year with the current year cash flow
      var scenario3yearoveryear2023value = scenario3cashflow2023value;
      var scenario3yearoveryear2024value = scenario3yearoveryear2023value + scenario3cashflow2024value;
      var scenario3yearoveryear2025value = scenario3yearoveryear2024value + scenario3cashflow2025value;
      var scenario3yearoveryear2026value = scenario3yearoveryear2025value + scenario3cashflow2026value;
      var scenario3yearoveryear2027value = scenario3yearoveryear2026value + scenario3cashflow2027value;
      var scenario3yearoveryear2028value = scenario3yearoveryear2027value + scenario3cashflow2028value;
      var scenario3yearoveryear2029value = scenario3yearoveryear2028value + scenario3cashflow2029value;
      var scenario3yearoveryear2030value = scenario3yearoveryear2029value + scenario3cashflow2030value;

      // Add values to the table row
      // We use parseInt to turn the value into an integer with no decimal places
      // There is also a $ sign in front of the values
      scenario3yearoveryear2023.innerText = "$" + parseInt(scenario3yearoveryear2023value);
      scenario3yearoveryear2024.innerText = "$" + parseInt(scenario3yearoveryear2024value);
      scenario3yearoveryear2025.innerText = "$" + parseInt(scenario3yearoveryear2025value);
      scenario3yearoveryear2026.innerText = "$" + parseInt(scenario3yearoveryear2026value);
      scenario3yearoveryear2027.innerText = "$" + parseInt(scenario3yearoveryear2027value);
      scenario3yearoveryear2028.innerText = "$" + parseInt(scenario3yearoveryear2028value);
      scenario3yearoveryear2029.innerText = "$" + parseInt(scenario3yearoveryear2029value);
      scenario3yearoveryear2030.innerText = "$" + parseInt(scenario3yearoveryear2030value);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Three Scenarios and Two Scenarios Graph with 2023 Results Section

      /* In this section, we are going to update the Three Scenarios and Two Scenarios graphs by adding the scenario 2 data to it
      and also update the 2023 results for Scenario 3*/

      // Creates table row with the id from index.html
      var threescenariosscenario12023result = document.getElementById("three-scenarios-scenario-1-2023-result");

      // This line will update the 2023 Results section with the scenario 1 total
      threescenariosscenario12023result.innerText = "$" + parseInt(scenario1total2023total);

      // Creates table row with the id from index.html
      var threescenariosscenario22023result = document.getElementById("three-scenarios-scenario-2-2023-result");

      // This line will update the 2023 Results section with the scenario 1 total
      threescenariosscenario22023result.innerText = "$" + parseInt(scenario2total2023total);

      // Creates table row with the id from index.html
      var threescenariosscenario32023result = document.getElementById("three-scenarios-scenario-3-2023-result");

      // This line will update the 2023 Results section with the scenario 3 total
      threescenariosscenario32023result.innerText = "$" + parseInt(scenario3total2023total);

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/

      // This array will contain all of the total values for 2023 to 2030 in scenario 1 for the Three Scenarios graph
      (threescenariosscenario1array).push(parseInt(scenario1total2023total), parseInt(scenario1total2024total),
        parseInt(scenario1total2025total), parseInt(scenario1total2026total), parseInt(scenario1total2027total),
        parseInt(scenario1total2028total), parseInt(scenario1total2029total), parseInt(scenario1total2030total));

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Three Scenarios Graph and 2023 Results Section

      /* In this section, we are going to update the Three Scenarios graphs by adding the scenario 2 data to it
      and also update the 2023 results for Scenario 2*/

      // This array will contain all of the total values for 2023 to 2030 in scenario 1 for the Three Scenarios graph
      (threescenariosscenario2array).push(parseInt(scenario2total2023total), parseInt(scenario2total2024total),
        parseInt(scenario2total2025total), parseInt(scenario2total2026total), parseInt(scenario2total2027total),
        parseInt(scenario2total2028total), parseInt(scenario2total2029total), parseInt(scenario2total2030total));

      // This array will contain all of the total values for 2023 to 2030 in scenario 1 for the Three Scenarios graph
      (threescenariosscenario3array).push(parseInt(scenario3total2023total), parseInt(scenario3total2024total),
        parseInt(scenario3total2025total), parseInt(scenario3total2026total), parseInt(scenario3total2027total),
        parseInt(scenario3total2028total), parseInt(scenario3total2029total), parseInt(scenario3total2030total));

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // Creates the Three Scenarios Graph in the Carbon Tax Calculator
      // Get graph id from index.html to input data, and style
      var threescenarioslinegraph = document.getElementById('three-scenarios');

      // IMPORTANT -> NOTES TO EDIT THE GRAPH
      /* In order to change the colour of the line, hex values can be found in websites such as this one https://www.colorhexa.com/*/
      /* To change the years in the x-axis for future years, and to remove past years, edit the labels section */
      /* For example to remove 2023 -> ['2024', '2025', '2026', '2027', '2028', '2029', '2030'] */
      /* For example to add 2031 -> ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'] */

      // The graph is being created here
      var threescenarioslinegraphwithdata = new Chart(threescenarioslinegraph, {
        type: 'line', // Specifies that we want to create a line graph
        data: {
          labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'], // The years that will appear on the x-axis.
          datasets: [{
              label: 'Scenario 1', // Scenario 1 line
              data: (threescenariosscenario1array), // This array is going to contain the corresponding y-axis values for each year in the x-axis
              borderColor: "#FF0000", // Specifies that we want the line to be green. It is written in hex values
              backgroundColor: "#FF0000",
              fill: false // It fills the area under the line which we do not want. That is why it is set to false. 
              // To fill the area under the line -> fill: true
            },
            {
              label: 'Scenario 2', // Scenario 2 line
              data: (threescenariosscenario2array), // This array is going to contain the corresponding y-axis values for each year in the x-axis
              borderColor: "#00B050", // Specifies that we want the line to be red. It is written in hex values
              backgroundColor: "#00B050",
              fill: false // It fills the area under the line which we do not want. That is why it is set to false. 
              // To fill the area under the line -> fill: true
            },
            {
              label: 'Scenario 3', // Scenario 3 line
              data: (threescenariosscenario3array), // This array is going to contain the corresponding y-axis values for each year in the x-axis
              borderColor: "#558ED5", // Specifies that we want the line to be blue. It is written in hex values
              backgroundColor: "#558ED5",
              fill: false // It fills the area under the line which we do not want. That is why it is set to false. 
              // To fill the area under the line -> fill: true
            }
          ]
        }
      });

      /*-------------------------------------------------------------------------------------------------------------------------------------------------*/
      // This line will update the Three Scenarios graph with the scenario 1 data
      threescenarioslinegraphwithdata.update();
      // The graph for scenarios 1, 2, and 3 will appear.
      document.getElementById("three-scenarios").style.display = "inline";
      // The Electricity Consumption Table will disappear.
      document.getElementById('fuel-cost-escalation-user-input').style.display = "none";
      // The carbon tax calculator results text will appear.
      document.getElementById('carbon-tax-calculator-results-text').style.display = "inline";
      // The three scenarios heading will appear.
      document.getElementById('three-scenarios-text').style.display = "inline";
      // The download chart data button will appear.
      document.getElementById('download-chart-data-button').style.display = "inline";
      // The recalculate carbon tax button will appear.
      document.getElementById('recalculate-carbon-tax-calculator-button').style.display = "inline";
      // The contact details will appear.
      document.getElementById('contact-details').style.display = "inline";
    } else {
      // null means nothing.
      null;
    }
  }
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section contains the code for the "Download Chart Data" button

// This function is going to take the html table and convert it to an Excel spreadsheet when the user clicks on the "Download Chart Data" button.
// It was created with Jquery.

$(document).ready(function () {
  function exportTableToCSV($table, filename) {
    var $rows = $table.find('tr:has(td),tr:has(th)'),
      tmpColDelim = String.fromCharCode(11),
      tmpRowDelim = String.fromCharCode(0),
      colDelim = '","',
      rowDelim = '"\r\n"',
      csv = '"' + $rows.map(function (i, row) {
        var $row = $(row),
          $cols = $row.find('td,th');
        return $cols.map(function (j, col) {
          var $col = $(col),
            text = $col.text();
          return text.replace(/"/g, '""');
        }).get().join(tmpColDelim);
      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"',
      csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    console.log(csv);
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(new Blob([csv], {
        type: "text/plain;charset=utf-8;"
      }), "csvname.csv")
    } else {
      $(this).attr({
        'download': filename,
        'href': csvData,
        'target': '_blank'
      });
    }
  }

  /* When the user clicks on the Download Chart Data Button, the table with the id "exportedresultstable" in html.index will download a 
  file called Results_Table_Carbon_Tax_Calculator.csv */

  /* Instructions to Update Download Chart Data Function */

  /* Download Different Table Instructions
  Step 1 -> Give an id to any table in the html.index file to download it.
  Step 2 -> Change '#exportedresultstable' to '#insertnewname'*/

  /* Change File Name Instructions 
  Change 'Results_Table_Carbon_Tax_Calculator.csv' to 'insert_new_name.csv'*/

  $("#download-chart-data-btn").on('click', function (event) {
    exportTableToCSV.apply(this, [$('#exportedresultstable'), 'Results_Table_Carbon_Tax_Calculator.csv']);
  });
});

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section contains the code for the "Restart Carbon Tax Calculator" button

// When the button to clear the carbon tax calculator is clicked, the restartcarbontaxcalculator function starts.
restartcarbontaxcalculatorbtn.addEventListener('click', restartcarbontaxcalculator);

// Clear Button Fuction
function restartcarbontaxcalculator() {

  // This section confirms that the user wants to restart the Carbon Tax Calculator if they click on the button by mistake.
  // Yes -> The webpage will refresh.
  let confirmuser = "Do you want to restart the carbon tax calculator?";
  if (confirm(confirmuser) == true) {
    // This line will refresh the webpage.
    location.reload();

    // No -> The webpage will not refresh.
  } else {
    null;
  }
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/