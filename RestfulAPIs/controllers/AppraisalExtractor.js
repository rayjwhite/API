/**
 * Created by rwhite on 9/30/2015.
 */
var _AppraisalETL = require("../models/AppraisalETL.js");
var _appraisalETL = new _AppraisalETL();
var _AppraisalValidator = require("../lib/AppraisalValidator.js");
var _appraisalValidator = new _AppraisalValidator();
var Logger = require("../common/logger.js");
var _logger = new Logger();

/** Constructor **/
function AppraisalController() {

}

/**
 * Returns the transformed JSON
 * @param {string} loanId
 * @param {object} xml
 * @returns {object}
 */
AppraisalController.prototype.GetAppraisalData = function (loanId, xml) {
    //Fetch the extracted, transformed, and loaded JSON with the required data
    //var appraisalData = ValidateData(_appraisalETL.ConvertXMLtoJSON(xml.toString()));
    //Return the fully packaged JSON object with meta data and appraisal data
    //return PackageAppraisalDataForTransport(loanId,appraisalData);
    console.log("This is where the XML payload will be converted into JSON.");
};

/** Export the class **/
module.exports = AppraisalController;

/**
 * Validate the transformed JSON data
 * @param {JSON} data
 * @returns {JSON}
 */
function ValidateData(data) {
    //Let's first make sure that the required fields exist and if they don't, we need to abort
    var requiredFields = [];
    var appraisal = data;
    requiredFields["Appraisal"] = appraisal;
    requiredFields["Appraisal.Property_City"] = appraisal.Property_City;
    requiredFields["Appraisal.Property_State"] = appraisal.Property_State;
    requiredFields["Appraisal.Property_PostalCode"] = appraisal.Property_PostalCode;
    if (!_appraisalValidator.HasRequiredFields(requiredFields)) {
        _logger.Log(_logger.LogEnum.ERROR, "Error: Required fields of appraisal are missing!  We must abort!", null, null);
        throw new Error("Error: Required fields of appraisal are missing!  We must abort!");
    }
    
    
    //Validate and resolve number fields
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_GrossAreaSquareFeetCount)) { appraisal.PROPERTY_STRUCTURE_GrossAreaSquareFeetCount = ResolveNumber(appraisal.PROPERTY_STRUCTURE_GrossAreaSquareFeetCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_GrossLivingAreaSquareFeetCount)) { appraisal.PROPERTY_STRUCTURE_GrossLivingAreaSquareFeetCount = ResolveNumber(appraisal.PROPERTY_STRUCTURE_GrossLivingAreaSquareFeetCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_OldestYearsCount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_OldestYearsCount = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_OldestYearsCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_NewestYearsCount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_NewestYearsCount = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_NewestYearsCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantAgeYearsCount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantAgeYearsCount = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantAgeYearsCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_PropertyStructureBuiltYear)) { appraisal.PROPERTY_STRUCTURE_PropertyStructureBuiltYear = ResolveNumber(appraisal.PROPERTY_STRUCTURE_PropertyStructureBuiltYear); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_LivingUnitCount)) { appraisal.PROPERTY_STRUCTURE_LivingUnitCount = ResolveNumber(appraisal.PROPERTY_STRUCTURE_LivingUnitCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_STRUCTURE_ANALYSIS_EffectiveAgeYearsCount)) { appraisal.PROPERTY_STRUCTURE_STRUCTURE_ANALYSIS_EffectiveAgeYearsCount = ResolveNumber(appraisal.PROPERTY_STRUCTURE_STRUCTURE_ANALYSIS_EffectiveAgeYearsCount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_TAX_YearIdentifier)) { appraisal.PROPERTY_TAX_YearIdentifier = ResolveNumber(appraisal.PROPERTY_TAX_YearIdentifier); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_0_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_0_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_0_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_1_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_1_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_1_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_2_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_2_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_2_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_3_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_3_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_3_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_4_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_4_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_4_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_5_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_5_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_5_Age); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_6_Age)) { appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_6_Age = ResolveNumber(appraisal.COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_6_Age); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_SingleFamily_Percent)) { appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_SingleFamily_Percent = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_SingleFamily_Percent); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_TwoToFourFamily_Percent)) { appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_TwoToFourFamily_Percent = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_TwoToFourFamily_Percent); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Apartment_Percent)) { appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Apartment_Percent = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Apartment_Percent); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Commercial_Percent)) { appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Commercial_Percent = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Commercial_Percent); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Other_Percent)) { appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Other_Percent = ResolveNumber(appraisal.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Other_Percent); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitOne)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitOne = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitOne); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitOne)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitOne = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitOne); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitOne)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitOne = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitOne); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitTwo)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitTwo = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitTwo); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitTwo)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitTwo = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitTwo); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitTwo)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitTwo = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitTwo); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitThree)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitThree = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitThree); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitThree)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitThree = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitThree); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitThree)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitThree = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitThree); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitFour)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitFour = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitFour); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitFour)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitFour = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitFour); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitFour)) { appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitFour = ResolveNumber(appraisal.PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitFour); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_GrossRentMultiplierFactor)) { appraisal.VALUATION_METHODS_INCOME_ANALYSIS_GrossRentMultiplierFactor = ResolveNumber(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_GrossRentMultiplierFactor); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsResearchedCount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsResearchedCount = ResolveNumber(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsResearchedCount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesResearchedCount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesResearchedCount = ResolveNumber(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesResearchedCount); }
    
    //Validate and resolve currency fields
    if (_appraisalValidator.HasValue(appraisal.PROJECT_PER_UNIT_FEE_Amount)) { appraisal.PROJECT_PER_UNIT_FEE_Amount = ResolveCurrency(appraisal.PROJECT_PER_UNIT_FEE_Amount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_LowPriceAmount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_LowPriceAmount = ResolveCurrency(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_LowPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_HighPriceAmount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_HighPriceAmount = ResolveCurrency(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_HighPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantPriceAmount)) { appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantPriceAmount = ResolveCurrency(appraisal.PROPERTY_NEIGHBORHOOD_HOUSING_PredominantPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_TAX_TotalTaxAmount)) { appraisal.PROPERTY_TAX_TotalTaxAmount = ResolveCurrency(appraisal.PROPERTY_TAX_TotalTaxAmount); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_TAX_TotalSpecialTaxAmount)) { appraisal.PROPERTY_TAX_TotalSpecialTaxAmount = ResolveCurrency(appraisal.PROPERTY_TAX_TotalSpecialTaxAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_0_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_0_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_0_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_0_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_0_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_0_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_0_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_1_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_1_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_1_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_1_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_1_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_1_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_1_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_2_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_2_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_2_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_2_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_2_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_2_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_2_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_3_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_3_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_3_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_3_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_3_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_3_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_3_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_4_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_4_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_4_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_4_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_4_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_4_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_4_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_5_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_5_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_5_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_5_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_5_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_5_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_5_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_6_PropertySalesAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_6_PropertySalesAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_6_PropertySalesAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossLivingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossLivingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossLivingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossBuildingAreaAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossBuildingAreaAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_6_SalesPricePerGrossBuildingAreaAmount); }
    if (_appraisalValidator.HasValue(appraisal.COMPARABLE_SALE_PropertySequenceID_6_AdjustedSalesPriceAmount)) { appraisal.COMPARABLE_SALE_PropertySequenceID_6_AdjustedSalesPriceAmount = ResolveCurrency(appraisal.COMPARABLE_SALE_PropertySequenceID_6_AdjustedSalesPriceAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitUnfurnishedMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitUnfurnishedMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_1_UnitUnfurnishedMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitUnfurnishedMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitUnfurnishedMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_2_UnitUnfurnishedMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitUnfurnishedMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitUnfurnishedMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_3_UnitUnfurnishedMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitUnfurnishedMarketRentAmount)) { appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitUnfurnishedMarketRentAmount = ResolveCurrency(appraisal.UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_4_UnitUnfurnishedMarketRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_COST_ANALYSIS_ValueIndicatedByCostApproachAmount)) { appraisal.VALUATION_METHODS_COST_ANALYSIS_ValueIndicatedByCostApproachAmount = ResolveCurrency(appraisal.VALUATION_METHODS_COST_ANALYSIS_ValueIndicatedByCostApproachAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_COST_ANALYSIS_NewImprovementTotalCostAmount)) { appraisal.VALUATION_METHODS_COST_ANALYSIS_NewImprovementTotalCostAmount = ResolveCurrency(appraisal.VALUATION_METHODS_COST_ANALYSIS_NewImprovementTotalCostAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_COST_ANALYSIS_SiteEstimatedValueAmount)) { appraisal.VALUATION_METHODS_COST_ANALYSIS_SiteEstimatedValueAmount = ResolveCurrency(appraisal.VALUATION_METHODS_COST_ANALYSIS_SiteEstimatedValueAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_ValueIndicatedByIncomeApproachAmount)) { appraisal.VALUATION_METHODS_INCOME_ANALYSIS_ValueIndicatedByIncomeApproachAmount = ResolveCurrency(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_ValueIndicatedByIncomeApproachAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_EstimatedMarketMonthlyRentAmount)) { appraisal.VALUATION_METHODS_INCOME_ANALYSIS_EstimatedMarketMonthlyRentAmount = ResolveCurrency(appraisal.VALUATION_METHODS_INCOME_ANALYSIS_EstimatedMarketMonthlyRentAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_ValueIndicatedBySalesComparisonApproachAmount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_ValueIndicatedBySalesComparisonApproachAmount = ResolveCurrency(appraisal.VALUATION_METHODS_SALES_COMPARISON_ValueIndicatedBySalesComparisonApproachAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeLowAmount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeLowAmount = ResolveCurrency(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeLowAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeHighAmount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeHighAmount = ResolveCurrency(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeHighAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeLowAmount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeLowAmount = ResolveCurrency(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeLowAmount); }
    if (_appraisalValidator.HasValue(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeHighAmount)) { appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeHighAmount = ResolveCurrency(appraisal.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeHighAmount); }
    
    //Validate the dates are valid and then return them all in the same locale format
    if (_appraisalValidator.HasValue(appraisal.VALUATION_AppraisalEffectiveDate)) { appraisal.VALUATION_AppraisalEffectiveDate = ResolveDate(appraisal.VALUATION_AppraisalEffectiveDate); }
    if (_appraisalValidator.HasValue(appraisal.PROPERTY_SITE_FLOOD_ZONE_NFIPMapPanelDate)) { appraisal.PROPERTY_SITE_FLOOD_ZONE_NFIPMapPanelDate = ResolveDate(appraisal.PROPERTY_SITE_FLOOD_ZONE_NFIPMapPanelDate); }
    if (_appraisalValidator.HasValue(appraisal.REPORT_AppraiserReportSignedDate)) { appraisal.REPORT_AppraiserReportSignedDate = ResolveDate(appraisal.REPORT_AppraiserReportSignedDate); }
    if (_appraisalValidator.HasValue(appraisal.PARTIES_APPRAISER_APPRAISER_LICENSE_ExpirationDate)) { appraisal.PARTIES_APPRAISER_APPRAISER_LICENSE_ExpirationDate = ResolveDate(appraisal.PARTIES_APPRAISER_APPRAISER_LICENSE_ExpirationDate); }
    
    //Return the JSON object with appraisal data
    return appraisal;
}

/**
 * Returns the appraisal packaged in another JSON object
 * @param {object} appraisal
 * @param {string} loanId
 * @returns {object}
 */
function PackageAppraisalDataForTransport(loanId, appraisal) {
    var guid = require('node-uuid');
    //Let's package the appraisal JSON into a larger JSON object
    //This is the format that the endpoint is expecting
    return {
        TransactionId: "AppraisalFinalStatus-" + guid.v4(),
        TargetSystem: "LOS",
        SourceSystem: "PORTAL",
        SourceSysteId: loanId,
        Mapping: { Id: "AppraisalToLOSMapper" },
        Loans: JSON.stringify(appraisal),
        LoanDocuments: [{
                AttachDocuments:
 [{
                        Description: "Automated Appraisal File Drop",
                        DocumentId: null,
                        DocumentTitle: "Appraisal",
                        Files:
 [{
                                FilePath: "Appraisals/" + loanId + ".pdf"
                            }]
                    }],
                LoanOriginationSystemBorrowerId: "0"
            }]
    };
}

/**
 * Returns an ISO formatted date if a date exists
 * @param {string} value
 * @returns {object}
 */
function ResolveDate(value) {
    if (_appraisalValidator.IsDate(value)) {
        value = new Date(value).toISOString();
    }
    else {
        value = "";
        console.log("A date property was invalid.");
        _logger.Log(_logger.LogEnum.INFO, "A date property was invalid.", null, null);
    }
    return value;
}

/**
 * Returns a clean value of the number for those fields that have text included but should not
 * @param {string} value
 * @returns {object}
 */
function ResolveNumber(value) {
    if (!_appraisalValidator.IsNumber(value))
        if (_appraisalValidator.IsNumber(_appraisalValidator.CleanNumber(value))) {
            value = _appraisalValidator.CleanNumber(value).toString();
        }
        else if (!_appraisalValidator.HasValue(_appraisalValidator.CleanNumber(value))) {
            value = "";
            _logger.Log(_logger.LogEnum.INFO, "A number property was invalid.", null, null);
            console.log("A number property was invalid.");
        }
    return value;
}

/**
 * Returns a clean value of the currency for those fields that have text included but should not
 * @param {string} value
 * @returns {object}
 */
function ResolveCurrency(value) {
    if (!_appraisalValidator.IsCurrency(value))
        if (!_appraisalValidator.IsCurrency(_appraisalValidator.CleanNumber(value)))
            if (!_appraisalValidator.HasValue(_appraisalValidator.CleanNumber(value))) {
                value = "";
                _logger.Log(_logger.LogEnum.INFO, "A decimal property was invalid.", null, null);
                console.log("A decimal property was invalid.");
            }
    return value;
}

