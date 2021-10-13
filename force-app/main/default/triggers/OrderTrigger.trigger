trigger OrderTrigger on Order__c (after insert, after update) {

    switch on Trigger.operationType{
        when AFTER_INSERT{
            List<Task> tasks = new List<Task>();

            for(Order__c order: Trigger.new){
                Task taskToDo = new Task(Status='Not Started', Priority='High', Subject='Other', Description='New order received that needs attention' );
                tasks.add(taskToDo);
            }
            insert tasks;
        }

        when AFTER_UPDATE{
            Set<Id> orderIds = new Set<Id>();

            for(Order__c order: Trigger.new){
                if(Trigger.oldMap.get(order.Id).Stage__c != order.Stage__c && order.Stage__c !='None'){
                    orderIds.add(order.Id);
                }
            }

            List<Order_Line_Item__c> orderLineItems = [SELECT Id, Status__c, Related_Order__c FROM Order_Line_Item__c WHERE Related_Order__c IN :orderIds];

            for(Order_Line_Item__c orderLineItem : orderLineItems){
                orderLineItem.Status__c = Trigger.newMap.get(orderLineItem.Related_Order__c).Stage__c;
            }

            if(orderLineItems.size()>0){
                update orderLineItems;
            }
        }
    }
}