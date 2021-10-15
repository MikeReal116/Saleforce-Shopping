public with sharing class OrderContoller {
    @AuraEnabled
    public static Order__c createOrder(String orderDetails, String orderLineDetails){
        try {
            Order__c newOrder = (Order__c)JSON.deserialize(orderDetails, Order__c.class);

            //throw an exception if address is blank
            if(String.isBlank(newOrder.Address__c) || String.isBlank(newOrder.Country__c) || String.isBlank(newOrder.Postal_Code__c)){
                CalloutException e = new CalloutException();
	            e.setMessage('Address, Country or Postal Code can not be blank');
	            throw e; 
            }

            newOrder.User__c = UserInfo.getUserId();
            newOrder.Order_Date__c = Date.today();
            insert newOrder;
         
            List<Order_Line_Item__c> orderlineItems = (List<Order_Line_Item__c>)JSON.deserialize(orderLineDetails, List<Order_Line_Item__c>.class);

            //update the OrderLine Items with related order
            for(Order_Line_Item__c orderLintItem : orderlineItems ){
                orderLintItem.Related_Order__c = newOrder.Id;
            }

            insert orderlineItems;

            return newOrder;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
