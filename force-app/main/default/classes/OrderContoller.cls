public with sharing class OrderContoller {
    @AuraEnabled
    public static Order__c createOrder(String orderDetails, String orderLineDetails){
        try {
            Order__c newOrder = (Order__c)JSON.deserialize(orderDetails, Order__c.class);
            newOrder.User__c = UserInfo.getUserId();
            insert newOrder;
            System.debug('first'+ newOrder);
            List<Order_Line_Item__c> orderlineItems = (List<Order_Line_Item__c>)JSON.deserialize(orderLineDetails, List<Order_Line_Item__c>.class);

            for(Order_Line_Item__c orderLintItem : orderlineItems ){
                orderLintItem.Related_Order__c = newOrder.Id;
            }

            insert orderlineItems;

            System.debug(newOrder);
            System.debug(orderlineItems);
            return newOrder;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
