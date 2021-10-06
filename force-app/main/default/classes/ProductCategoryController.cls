public with sharing class ProductCategoryController {
    
    @AuraEnabled(cacheable=true)
    public static List<Product_Category__c> getCategories(){
        try {
            return [SELECT Id, Name FROM Product_Category__c];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
