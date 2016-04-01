/**
 * Created by rwhite on 9/25/2015.
 */
var Logger = require("../common/logger.js");
var _logger = new Logger();

/** Constructor **/
function AppraisalETL() {

}
/**
 * Returns the transformed JSON
 * @param {string} xml
 * @returns {JSON}
 */
AppraisalETL.prototype.ConvertXMLtoJSON = function(xml) {
    var DOMParser = require('xmldom').DOMParser;
    var doc = new DOMParser().parseFromString(xml.toString(), 'text/xml');
    var appraisalFormType = doc.getElementsByTagName('REPORT').item(0).getAttribute('AppraisalFormType').toString();
    var AppraisalValidator = require("../lib/AppraisalValidator.js");
    var appraisalValidator = new AppraisalValidator();
    var _ = require('lodash');
    var appraisalJSON;
    try
    {
        //Make sure that there is property information before doing anything else
        if (doc.getElementsByTagName('PROPERTY').item(0).hasAttributes()) {
            /** Start populating the JSON object to be passed to API **/
            appraisalJSON =
            {
                //PROJECT/_PER_UNIT_FEE Element
                PROJECT_PER_UNIT_FEE_Amount:(doc.getElementsByTagName('_PER_UNIT_FEE').item(0)) ? doc.getElementsByTagName('_PER_UNIT_FEE').item(0).getAttribute('_Amount') : null,
                PROJECT_PER_UNIT_FEE_PeriodType:(doc.getElementsByTagName('_PER_UNIT_FEE').item(0)) ?  doc.getElementsByTagName('_PER_UNIT_FEE').item(0).getAttribute('_PeriodType') : null,

                //PROPERTY/_IDENTIFICATION Element
                PROPERTY_IDENTIFICATION_AssessorsParcelIdentifier: (doc.getElementsByTagName('_IDENTIFICATION').item(0)) ? doc.getElementsByTagName('_IDENTIFICATION').item(0).getAttribute('AssessorsParcelIdentifier') : null,
                PROPERTY_IDENTIFICATION_AssessorsParcelIdentifier_TaxID: (doc.getElementsByTagName('_IDENTIFICATION').item(0)) ? doc.getElementsByTagName('_IDENTIFICATION').item(0).getAttribute('AssessorsParcelIdentifier'): null,

                //PROPERTY Element
                Property_StreetAddress: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_StreetAddress') : null,
                Property_City: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_City') : null,
                Property_State: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_State') : null,
                Property_PostalCode: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_PostalCode') : null,
                Property_RightsType: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_RightsType') : null,
                Property_RightsTypeOtherDescription: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_RightsTypeOtherDescription') : null,
                PROPERTY_CurrentOccupancyType: (doc.getElementsByTagName('PROPERTY').item(0)) ? doc.getElementsByTagName('PROPERTY').item(0).getAttribute('_CurrentOccupancyType') : null,

                //PROPERTY/SITE Element
                PROPERTY_SITE_ZoningComplianceType: (doc.getElementsByTagName('SITE').item(0)) ? doc.getElementsByTagName('SITE').item(0).getAttribute('_ZoningComplianceType') : null,

                //PROPERTY/SITE/FLOOD_ZONE Element
                PROPERTY_SITE_FLOOD_ZONE_SpecialFloodHazardAreaIndicator: (doc.getElementsByTagName('FLOOD_ZONE').item(0)) ? doc.getElementsByTagName('FLOOD_ZONE').item(0).getAttribute('SpecialFloodHazardAreaIndicator') : null,
                PROPERTY_SITE_FLOOD_ZONE_NFIPFloodZoneIdentifier: (doc.getElementsByTagName('FLOOD_ZONE').item(0)) ? doc.getElementsByTagName('FLOOD_ZONE').item(0).getAttribute('NFIPFloodZoneIdentifier') : null,
                PROPERTY_SITE_FLOOD_ZONE_NFIPMapIdentifier: (doc.getElementsByTagName('FLOOD_ZONE').item(0)) ? doc.getElementsByTagName('FLOOD_ZONE').item(0).getAttribute('NFIPMapIdentifier') : null,
                PROPERTY_SITE_FLOOD_ZONE_NFIPMapPanelDate: (doc.getElementsByTagName('FLOOD_ZONE').item(0)) ? doc.getElementsByTagName('FLOOD_ZONE').item(0).getAttribute('NFIPMapPanelDate') : null,

                //PROPERTY/NEIGHBORHOOD Element
                PROPERTY_NEIGHBORHOOD_Name: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_Name') : null,
                PROPERTY_NEIGHBORHOOD_PropertyNeighborhoodLocationType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('PropertyNeighborhoodLocationType') : null,
                PROPERTY_NEIGHBORHOOD_BuiltupRangeType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_BuiltupRangeType') : null,
                PROPERTY_NEIGHBORHOOD_GrowthPaceType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_GrowthPaceType') : null,
                PROPERTY_NEIGHBORHOOD_PropertyValueTrendType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_PropertyValueTrendType') : null,
                PROPERTY_NEIGHBORHOOD_DemandSupplyType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_DemandSupplyType') : null,
                PROPERTY_NEIGHBORHOOD_TypicalMarketingTimeDurationType: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_TypicalMarketingTimeDurationType') : null,
                PROPERTY_NEIGHBORHOOD_Description: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_Description') : null,
                PROPERTY_NEIGHBORHOOD_MarketConditionsDescription: (doc.getElementsByTagName('NEIGHBORHOOD').item(0)) ? doc.getElementsByTagName('NEIGHBORHOOD').item(0).getAttribute('_MarketConditionsDescription') : null,

                //PROPERTY/NEIGHBORHOOD/_HOUSING Element
                PROPERTY_NEIGHBORHOOD_HOUSING_Type: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_Type') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_LowPriceAmount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_LowPriceAmount') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_HighPriceAmount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_HighPriceAmount') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_PredominantPriceAmount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_PredominantPriceAmount') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_OldestYearsCount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_OldestYearsCount') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_NewestYearsCount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_NewestYearsCount') : "",
                PROPERTY_NEIGHBORHOOD_HOUSING_PredominantAgeYearsCount: appraisalValidator.HasValue(doc.getElementsByTagName('_HOUSING').item(0)) ? doc.getElementsByTagName('_HOUSING').item(0).getAttribute('_PredominantAgeYearsCount') : "",

                //PROPERTY/STRUCTURE Element
                PROPERTY_STRUCTURE_TotalBedroomCount: (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('TotalBedroomCount') : null,
                PROPERTY_STRUCTURE_TotalBathroomCount: (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('TotalBathroomCount') : null,
                PROPERTY_STRUCTURE_GrossLivingAreaSquareFeetCount: (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('GrossLivingAreaSquareFeetCount') : null,
                PROPERTY_STRUCTURE_PropertyStructureBuiltYear: (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('PropertyStructureBuiltYear') : null,
                PROPERTY_STRUCTURE_LivingUnitCount: (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('LivingUnitCount') : null
            };

            if (appraisalFormType == "FNM1004" || appraisalFormType == "FNM1073")
            {
                appraisalJSON.PROPERTY_STRUCTURE_GrossAreaSquareFeetCount = (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('GrossLivingAreaSquareFeetCount') : null;
            }
            else if (appraisalFormType == "FNM1025")
            {
                appraisalJSON.PROPERTY_STRUCTURE_GrossAreaSquareFeetCount = (doc.getElementsByTagName('STRUCTURE').item(0)) ? doc.getElementsByTagName('STRUCTURE').item(0).getAttribute('GrossBuildingAreaSquareFeetCount') : null;
            }

            //PROPERTY/STRUCTURE/STRUCTURE_ANALYSIS Element
            appraisalJSON.PROPERTY_STRUCTURE_STRUCTURE_ANALYSIS_EffectiveAgeYearsCount = (doc.getElementsByTagName('STRUCTURE_ANALYSIS').item(0)) ? doc.getElementsByTagName('STRUCTURE_ANALYSIS').item(0).getAttribute('EffectiveAgeYearsCount') : null;

            //PROPERTY/_LEGAL_DESCRIPTION Element
            appraisalJSON.PROPERTY_LEGAL_DESCRIPTION_TextDescription = (doc.getElementsByTagName('_LEGAL_DESCRIPTION').item(0)) ? doc.getElementsByTagName('_LEGAL_DESCRIPTION').item(0).getAttribute('_TextDescription') : null;

            //PROPERTY/_TAX Element
            appraisalJSON.PROPERTY_TAX_YearIdentifier = (doc.getElementsByTagName('_TAX').item(0)) ? doc.getElementsByTagName('_TAX').item(0).getAttribute('_YearIdentifier') : null;
            appraisalJSON.PROPERTY_TAX_TotalTaxAmount = (doc.getElementsByTagName('_TAX').item(0)) ? doc.getElementsByTagName('_TAX').item(0).getAttribute('_TotalTaxAmount') : null;
            appraisalJSON.PROPERTY_TAX_TotalSpecialTaxAmount = (doc.getElementsByTagName('_TAX').item(0)) ? doc.getElementsByTagName('_TAX').item(0).getAttribute('_TotalSpecialTaxAmount') : null;

            //PROPERTY/PROPERTY_EXTENSION/PROPERTY_EXTENSION_SECTION/PROPERTY_EXTENSION_SECTION_DATA/PROPERTY_TYPE Element
            if (appraisalFormType == "FNM1004")
                appraisalJSON.PROPERTY_PROPERTY_EXTENSION_GSE_PUDIndicator = (doc.getElementsByTagName('PROPERTY_TYPE').item(0)) ? doc.getElementsByTagName('PROPERTY_TYPE').item(0).getAttribute('GSE_PUDIndicator') : null;

            //REPORT Element
            appraisalJSON.REPORT_AppraisalFormType = (doc.getElementsByTagName('REPORT').item(0)) ? doc.getElementsByTagName('REPORT').item(0).getAttribute('AppraisalFormType') : null;
            appraisalJSON.REPORT_AppraiserReportSignedDate = (doc.getElementsByTagName('REPORT').item(0)) ? doc.getElementsByTagName('REPORT').item(0).getAttribute('AppraiserReportSignedDate') : null;

            //PARTIES/MANAGEMENT_COMPANY_EXTENSION/MANAGEMENT_COMPANY_EXTENSION_SECTION/MANAGEMENT_COMPANY_EXTENSION_SECTION_DATA/MANAGEMENT_COMPANY Element
            if (appraisalFormType == "FNM1004" || appraisalFormType == "FNM1073") {
                appraisalJSON.PARTIES_MANAGEMENT_COMPANY_EXTENSION_MANAGEMENT_COMPANY_GSEManagementCompanyName = (doc.getElementsByTagName('MANAGEMENT_COMPANY').item(0)) ? doc.getElementsByTagName('MANAGEMENT_COMPANY').item(0).getAttribute('GSEManagementCompanyName') : null;
                appraisalJSON.PARTIES_MANAGEMENT_COMPANY_EXTENSION_MANAGEMENT_COMPANY_GSEManagementCompanyName2 = (doc.getElementsByTagName('MANAGEMENT_COMPANY').item(0)) ?  doc.getElementsByTagName('MANAGEMENT_COMPANY').item(0).getAttribute('GSEManagementCompanyName'): null;
            }

            //PARTIES/APPRAISER Element
            appraisalJSON.PARTIES_APPRAISER_CompanyName = (doc.getElementsByTagName('APPRAISER').item(0)) ? doc.getElementsByTagName('APPRAISER').item(0).getAttribute('_CompanyName') : null;
            appraisalJSON.PARTIES_APPRAISER_Name = (doc.getElementsByTagName('APPRAISER').item(0)) ? doc.getElementsByTagName('APPRAISER').item(0).getAttribute('_Name') : null;

            //PARTIES/APPRAISER/APPRAISER_LICENSE Element
            appraisalJSON.PARTIES_APPRAISER_APPRAISER_LICENSE_Type = (doc.getElementsByTagName('APPRAISER_LICENSE').item(0)) ? doc.getElementsByTagName('APPRAISER_LICENSE').item(0).getAttribute('_Type') : null;
            appraisalJSON.PARTIES_APPRAISER_APPRAISER_LICENSE_Identifier = (doc.getElementsByTagName('APPRAISER_LICENSE').item(0)) ? doc.getElementsByTagName('APPRAISER_LICENSE').item(0).getAttribute('_Identifier') : null;
            appraisalJSON.PARTIES_APPRAISER_APPRAISER_LICENSE_State = (doc.getElementsByTagName('APPRAISER_LICENSE').item(0)) ? doc.getElementsByTagName('APPRAISER_LICENSE').item(0).getAttribute('_State') : null;
            appraisalJSON.PARTIES_APPRAISER_APPRAISER_LICENSE_ExpirationDate = (doc.getElementsByTagName('APPRAISER_LICENSE').item(0)) ? doc.getElementsByTagName('APPRAISER_LICENSE').item(0).getAttribute('_ExpirationDate') : null;

            //VALUATION_METHODS/COST_ANALYSIS Element
            // ! This exists in the 1004 & 1025 but not the 1073.  There is no element in the 1073 named "COST_ANALYSIS".
            if (appraisalFormType != "FNM1073") {
                appraisalJSON.VALUATION_METHODS_COST_ANALYSIS_ValueIndicatedByCostApproachAmount = (doc.getElementsByTagName('COST_ANALYSIS').item(0)) ? doc.getElementsByTagName('COST_ANALYSIS').item(0).getAttribute('ValueIndicatedByCostApproachAmount') : null;
                appraisalJSON.VALUATION_METHODS_COST_ANALYSIS_NewImprovementTotalCostAmount = (doc.getElementsByTagName('COST_ANALYSIS').item(0)) ? doc.getElementsByTagName('COST_ANALYSIS').item(0).getAttribute('NewImprovementTotalCostAmount') : null;
                appraisalJSON.VALUATION_METHODS_COST_ANALYSIS_Type = (doc.getElementsByTagName('COST_ANALYSIS').item(0)) ? doc.getElementsByTagName('COST_ANALYSIS').item(0).getAttribute('_Type') : null;
                appraisalJSON.VALUATION_METHODS_COST_ANALYSIS_SiteEstimatedValueAmount = (doc.getElementsByTagName('COST_ANALYSIS').item(0)) ? doc.getElementsByTagName('COST_ANALYSIS').item(0).getAttribute('SiteEstimatedValueAmount') : null;
                appraisalJSON.VALUATION_METHODS_COST_ANALYSIS_SiteEstimatedValueComment = (doc.getElementsByTagName('COST_ANALYSIS').item(0)) ? doc.getElementsByTagName('COST_ANALYSIS').item(0).getAttribute('SiteEstimatedValueComment') : null;
            }

            //VALUATION_METHODS/INCOME_ANALYSIS Element
            appraisalJSON.VALUATION_METHODS_INCOME_ANALYSIS_ValueIndicatedByIncomeApproachAmount = (doc.getElementsByTagName('INCOME_ANALYSIS').item(0)) ? doc.getElementsByTagName('INCOME_ANALYSIS').item(0).getAttribute('ValueIndicatedByIncomeApproachAmount') : null;
            appraisalJSON.VALUATION_METHODS_INCOME_ANALYSIS_EstimatedMarketMonthlyRentAmount = (doc.getElementsByTagName('INCOME_ANALYSIS').item(0)) ? doc.getElementsByTagName('INCOME_ANALYSIS').item(0).getAttribute('EstimatedMarketMonthlyRentAmount') : null;
            appraisalJSON.VALUATION_METHODS_INCOME_ANALYSIS_GrossRentMultiplierFactor = (doc.getElementsByTagName('INCOME_ANALYSIS').item(0)) ? doc.getElementsByTagName('INCOME_ANALYSIS').item(0).getAttribute('GrossRentMultiplierFactor') : null;
            appraisalJSON.VALUATION_METHODS_INCOME_ANALYSIS_Comment = (doc.getElementsByTagName('INCOME_ANALYSIS').item(0)) ? doc.getElementsByTagName('INCOME_ANALYSIS').item(0).getAttribute('_Comment') : null;

            //VALUATION_METHODS/INCOME_ANALYSIS/MULTIFAMILY_RENT_SCHEDULE
            appraisalJSON.VALUATION_METHODS_INCOME_ANALYSIS_MULTIFAMILY_RENT_SCHEDULE_RentalEstimatedTotalMonthlyIncomeAmount = (doc.getElementsByTagName('MULTIFAMILY_RENT_SCHEDULE').item(0)) ? doc.getElementsByTagName('MULTIFAMILY_RENT_SCHEDULE').item(0).getAttribute('RentalEstimatedTotalMonthlyIncomeAmount') : "";

            //VALUATION_METHODS/SALES_COMPARISON Element
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_ValueIndicatedBySalesComparisonApproachAmount = (doc.getElementsByTagName('SALES_COMPARISON').item(0)) ? doc.getElementsByTagName('SALES_COMPARISON').item(0).getAttribute('ValueIndicatedBySalesComparisonApproachAmount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_CurrentSalesAgreementAnalysisComment = (doc.getElementsByTagName('SALES_COMPARISON').item(0)) ? doc.getElementsByTagName('SALES_COMPARISON').item(0).getAttribute('_CurrentSalesAgreementAnalysisComment') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_Comment = (doc.getElementsByTagName('SALES_COMPARISON').item(0)) ? doc.getElementsByTagName('SALES_COMPARISON').item(0).getAttribute('_Comment') : null;

            //VALUATION_METHODS/SALES_COMPARISON/RESEARCH Element
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsResearchedCount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableListingsResearchedCount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeLowAmount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableListingsPriceRangeLowAmount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableListingsPriceRangeHighAmount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableListingsPriceRangeHighAmount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesResearchedCount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableSalesResearchedCount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeLowAmount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableSalesPriceRangeLowAmount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_ComparableSalesPriceRangeHighAmount = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('ComparableSalesPriceRangeHighAmount') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_SalesHistoryResearchedIndicator = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('SalesHistoryResearchedIndicator') : null;
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_SalesHistoryNotResearchedComment = (doc.getElementsByTagName('RESEARCH').item(0)) ? doc.getElementsByTagName('RESEARCH').item(0).getAttribute('SalesHistoryNotResearchedComment') : null;

            //VALUATION_METHODS/SALES_COMPARISON/RESEARCH/SUBJECT Element
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_SUBJECT_HasPriorSalesIndicator = doc.getElementsByTagName('SUBJECT').item(0).getAttribute('_HasPriorSalesIndicator');
            appraisalJSON.VALUATION_METHODS_SALES_COMPARISON_RESEARCH_COMPARABLE_DataSourceDescription = doc.getElementsByTagName('COMPARABLE').item(0).getAttribute('DataSourceDescription');

            //VALUATION Element
            appraisalJSON.VALUATION_AppraisalEffectiveDate = (doc.getElementsByTagName('VALUATION').item(0)) ? doc.getElementsByTagName('VALUATION').item(0).getAttribute('AppraisalEffectiveDate') : null;
            appraisalJSON.VALUATION_PropertyAppraisedValueAmount = (doc.getElementsByTagName('VALUATION').item(0)) ? doc.getElementsByTagName('VALUATION').item(0).getAttribute('PropertyAppraisedValueAmount') : null;

            //VALUATION/_RECONCILIATION/_CONDITION_OF_APPRAISAL Element
            appraisalJSON.VALUATION_RECONCILIATION_CONDITION_OF_APPRAISAL_Type = (doc.getElementsByTagName('_CONDITION_OF_APPRAISAL').item(0)) ? doc.getElementsByTagName('_CONDITION_OF_APPRAISAL').item(0).getAttribute('_Type') : null;

            //VALUATION/_RECONCILIATION Element
            appraisalJSON.VALUATION_RECONCILIATION_SummaryComment = (doc.getElementsByTagName('_RECONCILIATION').item(0)) ? doc.getElementsByTagName('_RECONCILIATION').item(0).getAttribute('_SummaryComment') : null;
            appraisalJSON.VALUATION_RECONCILIATION_ConditionsComment = (doc.getElementsByTagName('_RECONCILIATION').item(0)) ? doc.getElementsByTagName('_RECONCILIATION').item(0).getAttribute('_ConditionsComment') : null;

            //PROPERTY/PROPERTY_ANALYSIS Element
            var propertyAnalysis = doc.getElementsByTagName('PROPERTY_ANALYSIS');
            for (var i = 0; i < propertyAnalysis.length; i++) {
                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'PropertyCondition')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_PropertyCondition_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'AdverseSiteConditions')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_AdverseSiteConditions_ExistsIndicator = propertyAnalysis[i].getAttribute('_ExistsIndicator');
                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'AdverseSiteConditions')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_AdverseSiteConditions_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'UtilitiesAndOffSiteImprovementsConformToNeighborhood')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_UtilitiesAndOffSiteImprovementsConformToNeighborhood_ExistsIndicator = propertyAnalysis[i].getAttribute('_ExistsIndicator');
                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'UtilitiesAndOffSiteImprovementsConformToNeighborhood')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_UtilitiesAndOffSiteImprovementsConformToNeighborhood_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'ConformsToNeighborhood')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_ConformsToNeighborhood_ExistsIndicator = propertyAnalysis[i].getAttribute('_ExistsIndicator');
                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'ConformsToNeighborhood')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_ConformsToNeighborhood_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'PhysicalDeficiency')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_PhysicalDeficiency_ExistsIndicator = propertyAnalysis[i].getAttribute('_ExistsIndicator');
                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'PhysicalDeficiency')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_PhysicalDeficiency_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'AdditionalFeatures')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_AdditionalFeatures_Comment = propertyAnalysis[i].getAttribute('_Comment');

                if (propertyAnalysis[i].getAttribute('_Type').toString() == 'QualityAndAppearance')
                    appraisalJSON.PROPERTY_PROPERTY_ANALYSIS_QualityAndAppearance_Comment = propertyAnalysis[i].getAttribute('_Comment');
            }

            //PROPERTY/NEIGHBORHOOD/_PRESENT_LAND_USE Element
            var presentLandUses = doc.getElementsByTagName('_PRESENT_LAND_USE');
            var landUsePrefix = "";
            for (i = 0; i < presentLandUses.length; i++) {
                landUsePrefix = "PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_";
                if (presentLandUses[i].getAttribute('_Type').toString() == "SingleFamily") {
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_SingleFamily_Percent = presentLandUses[i].getAttribute('_Percent');
                }
                if (presentLandUses[i].getAttribute('_Type').toString() == "TwoToFourFamily") {
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_TwoToFourFamily_Percent = presentLandUses[i].getAttribute('_Percent');
                }
                if (presentLandUses[i].getAttribute('_Type').toString() == "Apartment") {
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Apartment_Percent = presentLandUses[i].getAttribute('_Percent');
                }
                if (presentLandUses[i].getAttribute('_Type').toString() == "Commercial") {
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Commercial_Percent = presentLandUses[i].getAttribute('_Percent');
                }
                if (presentLandUses[i].getAttribute('_Type').toString() == "Other") {
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Other_Percent = presentLandUses[i].getAttribute('_Percent');
                    appraisalJSON.PROPERTY_NEIGHBORHOOD_PRESENT_LAND_USE_Other_TypeOtherDescription = presentLandUses[i].getAttribute('_TypeOtherDescription');
                }
            }

            //Get the form type
            appraisalJSON["FormType"] = appraisalFormType;

            //VALUATION_METHODS/INCOME_ANALYSIS/MULTIFAMILY_RENT_SCHEDULE/UNIT_RENT_SCHEDULE Element
            var unitRentSchedules = doc.getElementsByTagName('UNIT_RENT_SCHEDULE');
            var rentSchedulePrefix = "";
            var rentScheduleName = "";
            for (i = 0; i < unitRentSchedules.length; i++) {
                rentSchedulePrefix = "UNIT_RENT_SCHEDULE_UnitSequenceIdentifier_";
                if (unitRentSchedules[i].getAttribute('UnitSequenceIdentifier').toString() != "") {
                    rentScheduleName = rentSchedulePrefix + unitRentSchedules[i].getAttribute('UnitSequenceIdentifier').toString() + "_UnitMarketRentAmount";
                    appraisalJSON[rentScheduleName] = unitRentSchedules[i].getAttribute('UnitMarketRentAmount');
                    rentScheduleName = rentSchedulePrefix + unitRentSchedules[i].getAttribute('UnitSequenceIdentifier').toString() + "_UnitUnfurnishedMarketRentAmount";
                    appraisalJSON[rentScheduleName] = unitRentSchedules[i].getAttribute('UnitUnfurnishedMarketRentAmount');
                }
            }

            //VALUATION_METHODS/SALES_COMPARISONS/COMPARABLE_SALE Element
            var comparableSales = doc.getElementsByTagName('COMPARABLE_SALE');
            var propertyPrefix = "";
            var propertyName = "";
            for (i = 0; i < comparableSales.length; i++) {
                propertyPrefix = "COMPARABLE_SALE_PropertySequenceID_";
                if (comparableSales[i].getAttribute('PropertySequenceIdentifier').toString() == i.toString()) {
                    propertyName = propertyPrefix + i.toString() + "_PropertySalesAmount";
                    appraisalJSON[propertyName] = comparableSales[i].getAttribute('PropertySalesAmount');
                }
                if (comparableSales[i].getAttribute('PropertySequenceIdentifier').toString() == i.toString()) {
                    propertyName = propertyPrefix + i.toString() + "_SalesPricePerGrossLivingAreaAmount"; //Only available in the 1004 & 1073 forms
                    appraisalJSON[propertyName] = comparableSales[i].getAttribute('SalesPricePerGrossLivingAreaAmount');
                }
                if (comparableSales[i].getAttribute('PropertySequenceIdentifier').toString() == i.toString()) {
                    propertyName = propertyPrefix + i.toString() + "_SalesPricePerGrossBuildingAreaAmount"; //Only available in the 1025 form
                    appraisalJSON[propertyName] = comparableSales[i].getAttribute('SalesPricePerGrossBuildingAreaAmount');
                }
                if (comparableSales[i].getAttribute('PropertySequenceIdentifier').toString() == i.toString()) {
                    propertyName = propertyPrefix + i.toString() + "_AdjustedSalesPriceAmount";
                    appraisalJSON[propertyName] = comparableSales[i].getAttribute('AdjustedSalesPriceAmount');
                }
            }

            //VALUATION_METHODS/SALES_COMPARISONS/COMPARABLE_SALE/SALE_PRICE_ADJUSTMENT Element(s)
            var propertySequences = doc.getElementsByTagName("COMPARABLE_SALE");
            var salesPriceAdjustments = doc.getElementsByTagName('SALE_PRICE_ADJUSTMENT');
            var adjustmentsPrefix = "COMPARABLE_SALE_SALE_PRICE_ADJUSTMENT_PropertySequenceID_";
            for (var PropertySequenceIdentifier in propertySequences) {
                if (PropertySequenceIdentifier != null && PropertySequenceIdentifier == "0" && salesPriceAdjustments[0].parentNode.localName == "COMPARABLE_SALE" && salesPriceAdjustments[0].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                            appraisalJSON[adjustmentsPrefix + "0_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                            appraisalJSON[adjustmentsPrefix + "0_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                            appraisalJSON[adjustmentsPrefix + "0_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                            appraisalJSON[adjustmentsPrefix + "0_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "1") {
                            appraisalJSON[adjustmentsPrefix + "1_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "1") {
                            appraisalJSON[adjustmentsPrefix + "1_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description')
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "1") {
                            appraisalJSON[adjustmentsPrefix + "1_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "1") {
                            appraisalJSON[adjustmentsPrefix + "1_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "2") {
                            appraisalJSON[adjustmentsPrefix + "2_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "2") {
                            appraisalJSON[adjustmentsPrefix + "2_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "2") {
                            appraisalJSON[adjustmentsPrefix + "2_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "2") {
                            appraisalJSON[adjustmentsPrefix + "2_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "3") {
                            appraisalJSON[adjustmentsPrefix + "3_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "3") {
                            appraisalJSON[adjustmentsPrefix + "3_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "3") {
                            appraisalJSON[adjustmentsPrefix + "3_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "3") {
                            appraisalJSON[adjustmentsPrefix + "3_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "4") {
                            appraisalJSON[adjustmentsPrefix + "4_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "4") {
                            appraisalJSON[adjustmentsPrefix + "4_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "4") {
                            appraisalJSON[adjustmentsPrefix + "4_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "4") {
                            appraisalJSON[adjustmentsPrefix + "4_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "5") {
                            appraisalJSON[adjustmentsPrefix + "5_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "5") {
                            appraisalJSON[adjustmentsPrefix + "5_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "5") {
                            appraisalJSON[adjustmentsPrefix + "5_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "5") {
                            appraisalJSON[adjustmentsPrefix + "5_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                    for (i = 0; i < salesPriceAdjustments.length; i++) {
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Age" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "6") {
                            appraisalJSON[adjustmentsPrefix + "6_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Quality" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "6") {
                            appraisalJSON[adjustmentsPrefix + "6_" + salesPriceAdjustments[i].getAttribute('_Type')] =salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "Condition" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "6") {
                            appraisalJSON[adjustmentsPrefix + "6_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                        if (salesPriceAdjustments[i].getAttribute('_Type').toString() == "GrossLivingArea" && salesPriceAdjustments[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "6") {
                            appraisalJSON[adjustmentsPrefix + "6_" + salesPriceAdjustments[i].getAttribute('_Type')] = salesPriceAdjustments[i].getAttribute('_Description');
                        }
                    }
                }
            }

            //VALUATION_METHODS/SALES_COMPARISONS/COMPARABLE_SALE/LOCATION Element(s)
            var comps = doc.getElementsByTagName("COMPARABLE_SALE");
            var locations = doc.getElementsByTagName('LOCATION');
            adjustmentsPrefix = "COMPARABLE_SALE_LOCATION_PropertySequenceID_";
            for (var PropertySequenceIdentifier2 in comps) {
                if (PropertySequenceIdentifier2 != null && PropertySequenceIdentifier2 == "0" && locations[0].parentNode.localName == "COMPARABLE_SALE" && locations[0].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "0") {
                            appraisalJSON[adjustmentsPrefix + "0_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "1") {
                            appraisalJSON[adjustmentsPrefix + "1_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "2") {
                            appraisalJSON[adjustmentsPrefix + "2_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "3") {
                            appraisalJSON[adjustmentsPrefix + "3_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "4") {
                            appraisalJSON[adjustmentsPrefix + "4_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "5") {
                            appraisalJSON[adjustmentsPrefix + "5_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                    for (i = 0; i < locations.length; i++) {
                        if (locations[i].parentNode.attributes.getNamedItem("PropertySequenceIdentifier").nodeValue == "6") {
                            appraisalJSON[adjustmentsPrefix + "6_ProximityToSubjectDescription"] = locations[i].getAttribute('ProximityToSubjectDescription');
                        }
                    }
                }
            }

            //PROPERTY/_OFF_SITE_IMPROVEMENT Element
            var offSiteImprovements = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT');
            for (i = 0; i < offSiteImprovements.length; i++)
            {
                if (doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i) && doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_Type') && doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_OwnershipType'))
                {
                    var offSiteImprovementType = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_Type');
                    var ownershipType = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_OwnershipType');

                    switch (offSiteImprovementType)
                    {
                        case "Street":
                            if (ownershipType == "Public")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Street_Public"] = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_ExistsIndicator');
                            if (ownershipType == "Private")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Street_Private"] = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_ExistsIndicator');
                            break;
                        case "Alley":
                            if (ownershipType == "Public")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Alley_Public"] = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_ExistsIndicator');
                            if (ownershipType == "Private")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Alley_Private"] = doc.getElementsByTagName('_OFF_SITE_IMPROVEMENT').item(i).getAttribute('_ExistsIndicator');
                            break;
                        case "StreetAccess":
                            if (ownershipType == "Public")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Street_Public"] = "Y";
                            if (ownershipType == "Private")
                                appraisalJSON["PROPERTY_OFF_SITE_IMPROVEMENT_Street_Private"] = "Y";
                            break;
                    }

                }
            }

            //PROPERTY/SITE/SITE_UTILITY Element
            if (doc.getElementsByTagName('SITE_UTILITY').item(0) && doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_Type').toString() == "Electricity")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Electricity_PublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_PublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(0) && doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_Type').toString() == "Electricity")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Electricity_NonPublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_NonPublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(0) && doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_Type').toString() == "Electricity")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Electricity_NonPublicDescription"] = doc.getElementsByTagName('SITE_UTILITY').item(0).getAttribute('_NonPublicDescription');

            if (doc.getElementsByTagName('SITE_UTILITY').item(1) && doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_Type').toString() == "Gas")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Gas_PublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_PublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(1) && doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_Type').toString() == "Gas")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Gas_NonPublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_NonPublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(1) && doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_Type').toString() == "Gas")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Gas_NonPublicDescription"] = doc.getElementsByTagName('SITE_UTILITY').item(1).getAttribute('_NonPublicDescription');

            if (doc.getElementsByTagName('SITE_UTILITY').item(2) && doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_Type').toString() == "Water")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Water_PublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_PublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(2) && doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_Type').toString() == "Water")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Water_NonPublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_NonPublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(2) && doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_Type').toString() == "Water")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_Water_NonPublicDescription"] = doc.getElementsByTagName('SITE_UTILITY').item(2).getAttribute('_NonPublicDescription');

            if (doc.getElementsByTagName('SITE_UTILITY').item(3) && doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_Type').toString() == "SanitarySewer")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_SanitarySewer_PublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_PublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(3) && doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_Type').toString() == "SanitarySewer")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_SanitarySewer_NonPublicIndicator"] = doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_NonPublicIndicator');
            if (doc.getElementsByTagName('SITE_UTILITY').item(3) && doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_Type').toString() == "SanitarySewer")
                appraisalJSON["PROPERTY_SITE_SITE_UTILITY_SanitarySewer_NonPublicDescription"] = doc.getElementsByTagName('SITE_UTILITY').item(3).getAttribute('_NonPublicDescription');

            /*
             Start parsing elements/attributes from XML forms that don't exist in the other forms
             */
            if (appraisalFormType == "FNM1025") {
                //PROPERTY/STRUCTURE/_UNIT_GROUP Element
                if (doc.getElementsByTagName('_UNIT_GROUP').item(0) && doc.getElementsByTagName('_UNIT_GROUP').item(0).getAttribute('UnitType').toString() == "UnitOne") {
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitOne"] = doc.getElementsByTagName('_UNIT_GROUP').item(0).getAttribute('TotalBedroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitOne"] = doc.getElementsByTagName('_UNIT_GROUP').item(0).getAttribute('TotalBathroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitOne"] = doc.getElementsByTagName('_UNIT_GROUP').item(0).getAttribute('GrossLivingAreaSquareFeetCount');
                }
                if (doc.getElementsByTagName('_UNIT_GROUP').item(1) && doc.getElementsByTagName('_UNIT_GROUP').item(1).getAttribute('UnitType').toString() == "UnitTwo") {
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitTwo"] = doc.getElementsByTagName('_UNIT_GROUP').item(1).getAttribute('TotalBedroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitTwo"] = doc.getElementsByTagName('_UNIT_GROUP').item(1).getAttribute('TotalBathroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitTwo"] = doc.getElementsByTagName('_UNIT_GROUP').item(1).getAttribute('GrossLivingAreaSquareFeetCount');
                }
                if (doc.getElementsByTagName('_UNIT_GROUP').item(2) && doc.getElementsByTagName('_UNIT_GROUP').item(2).getAttribute('UnitType').toString() == "UnitThree") {
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitThree"] = doc.getElementsByTagName('_UNIT_GROUP').item(2).getAttribute('TotalBedroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitThree"] = doc.getElementsByTagName('_UNIT_GROUP').item(2).getAttribute('TotalBathroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitThree"] = doc.getElementsByTagName('_UNIT_GROUP').item(2).getAttribute('GrossLivingAreaSquareFeetCount');
                }
                if (doc.getElementsByTagName('_UNIT_GROUP').item(3) && doc.getElementsByTagName('_UNIT_GROUP').item(3).getAttribute('UnitType').toString() == "UnitFour") {
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBedroomCount_UnitFour"] = doc.getElementsByTagName('_UNIT_GROUP').item(3).getAttribute('TotalBedroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_TotalBathroomCount_UnitFour"] = doc.getElementsByTagName('_UNIT_GROUP').item(3).getAttribute('TotalBathroomCount');
                    appraisalJSON["PROPERTY_STRUCTURE_UNIT_GROUP_GrossLivingAreaSquareFeetCount_UnitFour"] = doc.getElementsByTagName('_UNIT_GROUP').item(3).getAttribute('GrossLivingAreaSquareFeetCount');
                }
            }

            //End the last element with a value that will always exists and that value will be the result of the last status update
            appraisalJSON["Description"] = "APPROVED - AS IS";
            appraisalJSON["Timestamp"] = new Date().toISOString();
        }
    }
    catch(exception)
    {
        appraisalJSON = {};
        console.log("Error: ".concat(exception.message));
        _logger.log(_logger.LogEnum.ERROR, exception.message, null, null);
    }

    //Bind the final JSON
    return appraisalJSON;
};

// export the class
module.exports = AppraisalETL;