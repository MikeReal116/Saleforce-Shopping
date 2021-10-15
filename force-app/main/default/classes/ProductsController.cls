public with sharing class ProductsController {

    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProducts(String categoryId, String priceFilter){
        try {
            String queryString = '';
            //fetch all products if no product category is given else fetch based on received id
            if(String.isBlank(categoryId)){
                queryString = 'SELECT Id, Name, Price__c, Image__c FROM Product__c ORDER BY Price__c ' + priceFilter;
                List<Product__c> myProducts = Database.query(queryString);
                return myProducts;
            }else{
                queryString = 'SELECT Id, Name, Price__c, Image__c FROM Product__c WHERE Product_Category__c = :categoryId   ORDER BY Price__c ' + priceFilter;
                List<Product__c> myProducts = Database.query(queryString);
                return myProducts;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
