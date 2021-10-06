public with sharing class CreateData {
    public static void CreateData() {
        List<Product_Category__c> categories = new List<Product_Category__c>();

        Product_Category__c category1 = new Product_Category__c(Name = 'Trainers');
        Product_Category__c category2 = new Product_Category__c(Name = 'Boots');
        Product_Category__c category3 = new Product_Category__c(Name = 'Shoes');
        Product_Category__c category4 = new Product_Category__c(Name = 'Sandals');

        categories.add(category1);
        categories.add(category2);
        categories.add(category3);
        categories.add(category4);

        insert categories;


        List<Product__c> products = new List<Product__c>();

        Product__c product1 = new Product__c(Name='Airmax 270', Image__c='https://res.cloudinary.com/wesbos/image/upload/v1579815920/sick-fits-keystone/5e2a13f0689b2835ae71d1a5.jpg', Price__c=120, Product_Category__c= category1.Id);
        Product__c product2 = new Product__c(Name='Vans Old Skool', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633533716/qforless/vans_s3jbme.jpg', Price__c=80, Product_Category__c= category1.Id);
        Product__c product3 = new Product__c(Name='Converse Chuck', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633533716/qforless/converse_jimgcr.jpg', Price__c=70, Product_Category__c= category1.Id);
        Product__c product4 = new Product__c(Name='Nike Vapour', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633533716/qforless/vapour_mjlwee.jpg', Price__c=100, Product_Category__c= category1.Id);
        Product__c product5 = new Product__c(Name='Polo Ralph', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633533704/qforless/polo_quaoy1.jpg', Price__c=95, Product_Category__c= category1.Id);
        Product__c product6 = new Product__c(Name='Timbaland', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633534295/qforless/tims_s6n9sj.jpg', Price__c=200, Product_Category__c= category2.Id);
        Product__c product7 = new Product__c(Name='Desert Boot', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633534294/qforless/desert_piczhs.jpg', Price__c=50, Product_Category__c= category2.Id);
        Product__c product8 = new Product__c(Name='Dr Martens', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633534294/qforless/drmartinboot_uajhi9.jpg', Price__c=210, Product_Category__c= category2.Id);
        Product__c product9 = new Product__c(Name='Bershka Chunky', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633534294/qforless/boot1_fz313d.jpg', Price__c=45, Product_Category__c= category2.Id);
        Product__c product10 = new Product__c(Name='Brogue Shoe', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633535364/qforless/shoe1_vhdsdq.jpg', Price__c=75, Product_Category__c= category3.Id);
        Product__c product11 = new Product__c(Name='Tassle Loafer', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633535364/qforless/shoe3_zm1daw.jpg', Price__c=50, Product_Category__c= category3.Id);
        Product__c product12 = new Product__c(Name='Selected Home', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633535364/qforless/shoe4_vyxmwu.jpg', Price__c=105, Product_Category__c= category3.Id);
        Product__c product13 = new Product__c(Name='Polished Loafer', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633535364/qforless/shoe5_mfwq6a.jpg', Price__c=40, Product_Category__c= category3.Id);
        Product__c product14 = new Product__c(Name='Office Silas', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633536371/qforless/sandal_kpktky.jpg', Price__c=30, Product_Category__c= category4.Id);
        Product__c product15 = new Product__c(Name='Design Sandals', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633536371/qforless/sandal3_di3k9t.jpg', Price__c=20, Product_Category__c= category4.Id);
        Product__c product16 = new Product__c(Name='Chilton Sandals', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633536371/qforless/sandal4_j8ya1u.jpg', Price__c=50, Product_Category__c= category4.Id);
        Product__c product17 = new Product__c(Name='Rope Sandal', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633536371/qforless/sandal2_yattvs.jpg', Price__c=25, Product_Category__c= category4.Id);
        Product__c product18 = new Product__c(Name='Low Fit', Image__c='https://res.cloudinary.com/mikereal/image/upload/v1633535364/qforless/shoe2_kxf4pa.jpg', Price__c=45, Product_Category__c= category3.Id);

        products.add(product1); 
        products.add(product2); 
        products.add(product3); 
        products.add(product4); 
        products.add(product5); 
        products.add(product6); 
        products.add(product7); 
        products.add(product8); 
        products.add(product9); 
        products.add(product10); 
        products.add(product11); 
        products.add(product12); 
        products.add(product13); 
        products.add(product14); 
        products.add(product15); 
        products.add(product16);
        products.add(product17);
        products.add(product18);  
        
        insert products;
    }
}
