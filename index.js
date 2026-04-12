// Product Data















































// بيانات المنتجات الأكثر مبيعاً (منفصلة تماماً)
const bestSellersData = [
    {
        id: 201,
        title: "ULTIMATE NUTRITION C4 Pre-Workout",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "sss1.jpg",
        specifications: [
            "Explosive energy and focus",
            "Increased muscle pumps",
            "Enhanced endurance",
            "Great tasting flavors",
            "30 servings per container"
        ],
        sales: 2987,
        rating: 4.8,
        badge: "BEST SELLER"
    },
    {
        id: 202,
        title: "USN Professional Pre-Workout",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "sss1.jpg",
        specifications: [
            "Clinically dosed ingredients",
            "Sustained energy and focus",
            "Increased muscle pumps",
            "No artificial dyes",
            "30 servings per container"
        ],
        sales: 1987,
        rating: 4.5,
        badge: "TOP SELLER"
    },
    {
        id: 203,
        title: "DYMATIZE ISO 100 Hydrolyzed Protein",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "sss1.jpg",
        specifications: [
            "25g hydrolyzed whey protein isolate",
            "Zero fat and sugar",
            "Easy digestion and fast absorption",
            "71 servings per container"
        ],
        sales: 2210,
        rating: 4.7,
        badge: "HOT SELLER"
    },
    {
        id: 204,
        title: "ANIMAL PRE-WORKOUT",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "sss1.jpg",
        specifications: [
            "Boosts energy and focus within 20 minutes",
            "Enhances endurance and performance",
            "Supports nitric oxide production",
            "44 servings per container"
        ],
        sales: 2456,
        rating: 4.6,
        badge: "POPULAR"
    }
];

// توليد النجوم للتقييم
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// عرض المنتجات الأكثر مبيعاً في السلايدر
function displayBestSellers() {
    const bestSellerSwiperWrapper = document.querySelector('.bestSellerSwiper .swiper-wrapper');
    if (!bestSellerSwiperWrapper) return;
    
    bestSellerSwiperWrapper.innerHTML = '';
    
    const sortedProducts = [...bestSellersData].sort((a, b) => b.sales - a.sales);
    
    sortedProducts.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="best-seller-badge">${product.badge}</div>
            <div class="sales-badge">
                <i class="fas fa-fire"></i>
                <span>${product.sales.toLocaleString()} sold</span>
            </div>
            
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-text">${product.rating}/5</span>
                </div>
                
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                
                <button class="view-details bestseller-view" data-id="${product.id}" data-type="bestseller">View Details</button>
            </div>
        `;
        
        bestSellerSwiperWrapper.appendChild(slide);
    });
    
    // إضافة event listeners
    document.querySelectorAll('.bestseller-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openBestSellerProductModal(productId);
        });
    });
}

// دالة لفتح نافذة المنتج الأكثر مبيعاً
function openBestSellerProductModal(productId) {
    const product = bestSellersData.find(p => p.id === productId);
    
    if (!product) {
        console.error('Best seller product not found:', productId);
        return;
    }
    
    // تعبئة البيانات
    const modalImg = document.getElementById('modal-product-img');
    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalOriginalPrice = document.getElementById('modal-product-original-price');
    const modalSpecs = document.getElementById('modal-product-specs');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (modalImg && modalTitle) {
        modalImg.src = product.image;
        modalImg.alt = product.title;
        modalTitle.textContent = product.title;
        modalCategory.textContent = categoryTranslations[product.category] || product.category;
        modalCategory.className = 'product-category';
        modalPrice.textContent = product.price;
        
        if (product.originalPrice) {
            modalOriginalPrice.textContent = product.originalPrice;
            modalOriginalPrice.style.display = 'inline';
        } else {
            modalOriginalPrice.style.display = 'none';
        }
        
        // المواصفات
        modalSpecs.innerHTML = '';
        product.specifications.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            modalSpecs.appendChild(li);
        });
        
        // تحديث رابط الواتساب
        const productName = encodeURIComponent(product.title);
        const price = encodeURIComponent(product.price);
        whatsappBtn.href = `https://wa.me/07800925175?text=I'm%20interested%20in%20${productName}%20(${price})`;
        
        // عرض النافذة
        const modal = document.querySelector('.product-modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// تهيئة سلايدر المنتجات الأكثر مبيعاً
function initBestSellerSwiper() {
    if (document.querySelector('.bestSellerSwiper')) {
        window.bestSellerSwiper = new Swiper('.bestSellerSwiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.best-seller-slider .swiper-button-next',
                prevEl: '.best-seller-slider .swiper-button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            },
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            speed: 800,
        });
        
        console.log('✅ Best seller slider initialized');
        return window.bestSellerSwiper;
    }
    return null;
}

// تهيئة الصفحة للمنتجات الأكثر مبيعاً
document.addEventListener('DOMContentLoaded', function() {
    displayBestSellers();
    initBestSellerSwiper();
    
    console.log('✅ Best sellers system loaded');
});



































const products = [
    // OPTIMUM NUTRION Products
    {
        id: 1,
        title: "Gold Standard 100% Whey Protein Powder",
        category: "protein",
        description: "Gold Standard 100% Whey - World's best-selling whey protein",
        price: "$86.99",
        originalPrice: "",
        image: "s1.jpg",
        specifications: [
            "24g of high-quality, fast-absorbing premium whey protein powder per serving",
            "5.5g of BCAA in each servings",
            "Mix one scoop with water, milk or into your favourite smoothie",
            "Low in sugars and less than 120 calories"
        ],
        featured: false
    },
    {
        id: 2,
        title: "Micronised Creatine Powder",
        category: "protein",
        description: "High-quality casein for sustained amino acid release",
        price: "$46.99",
        originalPrice: "",
        image: "s2.jpg",
        specifications: [
            "Made from 100% creatine monohydrate",
            "3g of creatine monohydrate per serving",
            "Ideal for nighttime use",
            "Mixes easily with no gritty taste or texture",
            "Available in flavoured and unflavoured options"
        ],
        featured: false
    },
    {
        id: 3,
        title: "Serious Mass Weight Gainer Protein Powder",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "87.99",
        originalPrice: "",
        image: "s3.jpg",
        specifications: [
            "50g sustained-release casein protein",
            "Provides over 1,250 kcal per serving to fuel your goals.",
            "Supports muscle growth and recovery",
            "3 g Creatine ",
            "250 g Carbs"
        ],
        featured: false
    },

    {
        id: 4,
        title: "OPTIMUM NUTRION AMINO ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "s4.jpg",
        specifications: [
            "FULL AMINO ACID SPECTRUM ",
            "320 TABLETS ",
            "160 SERVINGS ",
            "DIETARY SUPPLEMNT ",
            "200 servings per container"
        ],
        featured: false
    },

   {
        id: 134,
        title: "GLUTAMINE POWDER ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "134.jpg",
        specifications: [
            "5G GLUTAMINE SUPPLEMENT ",
            "AMINO ACID SUPPORT",
            "MIXES EASILY ",
            "UNFLAVORED ",
            "55 SERVINGS"
        ],
        featured: false
    },
   {
        id:135,
        title: "GOLD STANDARD 100% ISOLATE",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "135.JPG",
        specifications: [
            "HYDROLYEZD ",
            "ULTRA-FILTERED WHEY PROTEIN ISOLATE ",
            "GLUTEN FREE ",
            "BANNED FREE",
            "44 SERVINGS ",
            "25G PROTEIN",
            "5.5 BCAA"
        ],
        featured: false
    },
   {
        id: 136,
        title: "SERIOUS MASS ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "136.jpg",
        specifications: [
            "50 PROTEIN",
            "1.250 CALORIES ",
            "252 CARBS",
            "BANANA FLAVOUR",
            "8 SERVINGS "
        ],
        featured: false
    },
   {
        id: 137,
        title: "ZINC MAGNESIUM ASPARTATE",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "137.jpg",
        specifications: [
            "180 CAPSULES ",
            "60 SERVINGS ",
            "VITAMIN ",
            " MINERAL SUPPORT FOR ACTIVE ADULTS ",
            "PROTENT COMBINATION OF ZINC MAGBESIUM AND VITAMIN B6",
            "DIETARY SUPPLEMENT"
        ],
        featured: false
    },
   {
        id: 138,
        title: "GOLD STANDARD PRO GAINER",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "138jpg",
        specifications: [
            "650 CALORIES ",
            "60G PROTEIN ",
            "SUPPORTS CALORIE INTAKE AND MUSCLE RECOVERY ",
            "VANILLA CUSTARD ",
            ""
        ],
        featured: false
    },
   {
        id:139,
        title: "PLATINUM HYDROWHEY ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "139.jpg",
        specifications: [
            "FOR MUSCLE SUPPORT AND RECOVERY",
            "30G PROTEIN,
            "15.5G ESSENTIAL AMINO ACID",
            "8.8G BCAA ",
            "TURBO CHOCOLAT FLAVORED",
            "20 SERVINGS"
        ],
        featured: false
    },
   {
        id: 140,
        title: "PALTINUM HYDROWHEY",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "140jpg",
        specifications: [
            "30G PROTEIN ",
            "15.5 BCAA ",
            "41 SEVINGS ",
            "VELOCITY VANILLA  ",
            "PROTEIN POWDER DRINK MIX"
        ],
        featured: false
    },
   {
        id: 141,
        title: "ESSETIAL AMINO ENERGY  ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "141.jpg",
        specifications: [
            "ANYTIME ENERGY AND RECOVERY",
            "0G SUGAR",
            "CAFFEINE FROM NATURAL SOURCES",
            "BLUE RASPBERRY FLAVORED",
            "30 servings "
        ],
        featured: false
    },
   {
        id: 142,
        title: "ESSENTIAL AMMINO ENERGY ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "142.jpg",
        specifications: [
            "ANTYTIME ENERGY AND RECOVERY  ",
            "0 SUGAR",
            "CAFFEINE FROM NATURAL SOURCES ",
            "CONCORD GRAPE ",
            "30 SERVINGS "
        ],
        featured: false
    },
   {
        id: 143,
        title: "MICRONIZEID CREATINE POWDER",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "143.jpg",
        specifications: [
            "240 SERVINGS ",
            "UNFLAVORED",
            "PURE CREATINE MONOHYDRATE  ",
            "5G PER SERVINGS ",
            ""
        ],
        featured: false
    },
   {
        id: 144,
        title: "ESSENTIAL AMMINO ENERGY ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "144.jpg",
        specifications: [
            "ANYTIME ENERGY AND RECOVERY ",
            "0 SUGAR   ",
            "30 SERVINGS ",
            "CAFFINE FROM NATURAL SOURCES ",
            "BLUEBERRY MOJITO FLAVORED"
        ],
        featured: false
    },
   {
        id: 145,
        title: "GOLD STANDARD WHEY 100% ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "145.jpg",
        specifications: [
            "24G PROTEIN",
            "5.5 BCAA ",
            "141 SERVINGS ",
            "EXTREME MILK CHOCOLATE FLAVORED",
            ""
        ],
        featured: false
    },
   {
        id: 4,
        title: "OPTIMUM NUTRION AMINO ",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "s4.jpg",
        specifications: [
            "FULL AMINO ACID SPECTRUM ",
            "320 TABLETS ",
            "160 SERVINGS ",
            "DIETARY SUPPLEMNT ",
            "200 servings per container"
        ],
        featured: false
    },
   {
        id:146,
        title: "ESSENTIAL AMINO ENERGY",
        category: "protein",
        description: "100% pure creatine monohydrate powder",
        price: "$54.99",
        originalPrice: "",
        image: "146jpg",
        specifications: [
            "5G AMINO ACIDS",
            "0G SUGAR ",
            "CAFFINE FROM NATURAL SOURCES ",
            "TANGERINE WAVE FLAVORED ",
            "30 SERVINGS"
        ],
        featured: false
    },

    

    // NUTREX RESEARCH Products
    {
        id: 5,
        title: "IsoFit 2 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$47.50",
        originalPrice: "",
        image: "s5.jpg",
        specifications: [ 
            "High Protein Purity - Low Fats, Carbs, Sugars",
            "Fast Absorbing – Easy to Digest",
            "Delicious Taste – Premium Dessert Flavors",
            "Supports Muscle Growth + Recovery",
            "Supports Muscle Growth + Recovery"
        ],
        featured: false
    },

     {
        id: 6,
        title: "Lipo-6 Hers UC",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$38.13",
        originalPrice: "",
        image: "s6.jpg",
        specifications: [
            "Accelerated Fat Loss & Boosted Metabolic Rate",
            "Advanced Appetite Control for Women",
            "Hair & Beauty Complex",
            "Liquid-Cap Technology for Quick Results",
           
        ],
        featured: false
    },
     {
        id: 7,
        title: "IsoFit 5 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$84.00",
        originalPrice: "",
        image: "s7.jpg",
        specifications: [
            "High Protein Purity - Low Fats, Carbs, Sugars",
            "Fast Absorbing – Easy to Digest",
            "Delicious Taste – Premium Dessert Flavors",
            "Supports Muscle Growth + Recovery",
            "Clinician’s Choice Product"
        ],
        featured: false
    },
     {
        id: 8,
        title: "Mass Infusion - 12 lb",
        category: "creatine",
        description: "Advanced fat burning supplement",
        price: "$80.50",
        originalPrice: "",
        image: "s8.jpg",
        specifications: [
            "High-Calorie Formula for Rapid Mass Gain ",
            "Triple Protein Blend for Fast and Sustained Muscle Support ",
            "Supports Muscle Recovery and Growth ",
            "Ideal for Post-Workout or Meal Replacement ",
         
        ],
        featured: false
    },
    {
        id: 9,
        title: "T-Up Max",
        category: "creatine",
        description: "Branched-chain amino acids in 2:1:1 ratio",
        price: "$39.99",
        originalPrice: "",
        image: "s9.jpg",
        specifications: [
            "Naturally Boosts Testosterone Levels ",
            "Enhances Strength and Muscle Gains ",
            "Increases Stamina and Endurance ",
            "Supports Sexual Health and Vitality "
        ],
        featured: false
    },

     {
        id: 10,
        title: "L-Arginine",
        category: "creatine",
        description: "Branched-chain amino acids in 2:1:1 ratio",
        price: "35.10",
        originalPrice: "",
        image: "s10.jpg",
        specifications: [
            "Enhances Blood Flow and Circulation ",
            "Supports Protein Synthesis for Muscle Growth ",
            "Boosts Nitric Oxide Production for Better Pumps ",
            "Promotes Hormone Release for Overall Performance "
        ],
        featured: false
    },


    // ANIMAL Products
    {
        id: 11,
        title: "Animal Pak",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$48.50",
        originalPrice: "",
        image: "s11.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond",
            "44 PACKS",
        ],
        featured: false
    },


{
        id: 11,
        title: "Animal Pak",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$39.00",
        originalPrice: "",
        image: "s11.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond",
            "30 PACKS",

        ],
        featured: false
    },


    
      {
        id: 12,
        title: "Animal Stak",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$42.00",
        originalPrice: "",
        image: "s12.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond",
            "21 PACKS",
        ],
     
    },
      {
        id: 13,
        title: "ANIMAL PRE-WORKOUT",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$49.00",
        originalPrice: "",
        image: "s13.jpg",
        specifications: [
            "Boosts energy and focus within 20 minutes",
            "Enhances endurance and performance",
            "Supports nitric oxide production",
            "44 servings per container"
        ],
       
    },
      {
        id: 14,
        title: "Animal Cuts",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$47.99",
        originalPrice: "",
        image: "s14.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond",
            "42 PACKS",
        ],
     
    },
    {
        id: 15,
        title: "Animal Test",
        category: "energy",
        description: "Essential amino acids for athletes",
        price: "$44.00",
        originalPrice: "",
        image: "s15.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond",
            "21 PACKS"
        ],
        
    },

      {
        id: 16,
        title: "Animal Flex",
        category: "energy",
        description: "Pre-workout supplement for energy and performance",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s16.jpg",
        specifications: [
            "Earn 2X Points Per Every Dollar Spent On Subscriptions",
            "Cancel Or Pause Your Subscription Anytime",
            "Always Free Shipping + 90 Day Money Back Guarantee",
            "Save 20% on Shipment 3 And Beyond"
        ],
        featured: false
    },

    // DYMATIZ Products
    {
        id: 17,
        title: "Elite Whey 100%®",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$74.99",
        originalPrice: "$84.99",
        image: "s17.jpg",
        specifications: [
            "Protein 25g",
            "Calories 130",
            "BCAAs5.3g",
            "Leucine 2.3g"
        ],
        featured: false
    },
     {
        id: 18,
        title: "ISO 100",
        category: "amino",
        description: "100% hydrolyzed whey protein isolate",
        price: "$113.00",
        originalPrice: "",
        image: "s18.jpg",
        specifications: [
            "Protein 25g",
            "Calories 120",
            "Sugar 1g",
            "BCAAs 5.5g"
        ],
        featured: false
    },


    // MUSCLETECH Products
    {
        id: 20,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s20.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 21,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s21.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured:false
    },

     {
        id: 22,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s22.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 23,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s23.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured:false
    },

     {
        id: 24,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s24.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 25,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s25.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 26,
        title: "EXTRIFIT ",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s26.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 27,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s27.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 28,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s28.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 29,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s29.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 30,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s30.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },

     {
        id: 31,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s31.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 32,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s32.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 34,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s34.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id: 35,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s35.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },


     {
        id:36,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s36.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },



     {
        id: 37,
        title: "EXTRIFIT Whey Protein",
        category: "EXTRIFIT",
        description: "Premium whey protein with creatine",
        price: "$84.99",
        originalPrice: "$94.99",
        image: "s37.jpg",
        specifications: [
            "30g premium protein blend",
            "3g creatine monohydrate",
            "5g glutamine",
            "Supports muscle growth and recovery",
            "62 servings per container"
        ],
        featured: false
    },
   
    // BSN Products
    {
        id: 119,
        title: "BCAA POWDER",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$29.00",
        originalPrice: "",
        image: "119.jpg",
        specifications: [
            "",
            "STIMULATES LEAN MUSCLE GROWTH",
            "ENHANCE RECOVERY FROM TRAINING",
            "50 SERVINGS UNFLAVORED ",
        
        ],
        featured: false
    },
    {
        id: 120,
        title: "BETA-ALANINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$28.10",
        originalPrice: "",
        image: "120.jpg",
        specifications: [
            "PROMOTES MUSCLE ENDUANCE",
            "IMPROVES WORKOUT PERFORMANCE",
            "100 SERVINGS UNFLAVORED",
            
            
        ],
        featured: false
    },
    {
        id: 121,
        title: "CLA 1250",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$19.00",
        originalPrice: "",
        image: "121.jpg",
        specifications: [
            "AIDS FAT LOSS",
            "HELPS INCREASE MUSCLE DEFINITION ",
            "90 SOFTIGELS",
            
           
        ],
        featured: false
    },
    {
        id: 122,
        title: "JOINT SUPPORT",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$28.50",
        originalPrice: "",
        image: "122.jpg",
        specifications: [
            "SUPPOTS HEALTHY JOINTS",
            "INCLUDES GLUCOSAMINE CHONDROITIN COLLAGEN PEPTIDES",
            "60 TABLETS",
            
           
        ],
        featured: false
    },
    {
        id: 123,
        title: "L-ARGININE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$29.00",
        originalPrice: "",
        image: "123.jpg",
        specifications: [
            "FREE FROM AMINO ACIDE",
            "CONDITIONALLY ESSENTIAL AMINO ACID ",
            "INCREASE NITRIC OXIDE ACTIVITY",
            "180 TABLETS",
            
        ],
        featured: false
    },
    {
        id: 124,
        title: "LIVER CLEANSE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$24.99",
        originalPrice: "",
        image: "124.jpg",
        specifications: [
            "SUPPORT HEATHY LIVER FUNCTION",
            "DETOXIFY AND PURIFY ",
            "SUPPORTS HEALTH AND PERFORMANCE",
            "60 VEG CAPSULES",
           
        ],
        featured: false
    },
    {
        id: 125,
        title: "MENS MULTI+TEST",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$28.80",
        originalPrice: "",
        image: "125.jpg",
        specifications: [
            "MULTIVITAMINE TESTOSTERONE SUPPORT",
            "SUPPORTS HEALTHY IMMUNE FUNCTION",
            "COMPLETE NUTRIENT SUPPORT FOR ATHLETES",
            "60 TABLETS ",
            
        ],
        featured: false
    },
    {
        id: 126,
        title: "ZMAG-T",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$27.70",
        originalPrice: "",
        image: "126.jpg",
        specifications: [
            "ZINC MAGNESIUM B6 + BORON ",
            "ENHANCE MUSCLE SIZE & STRENGTH",
            "PROMOTES TESTOSTERONE PRODUCTION & RESTORATIVE SLEEP",
            "90 VEG CAPSULES",
            
        ],
        featured: false
    },
    {
        id: 127,
        title: "PMP ",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$38.00",
        originalPrice: "",
        image: "127.jpg",
        specifications: [
            "PEAK MUSCLE PERFORMANCE",
            "INTENSE PERFORMANCE GAINS & MENTAL FOCUS ",
            "MUSCLE ENERGY & REPID VASCULAR MUSCLE PUMPS",
            "30 SERVINGS",
            
        ],
        featured: false
    },
    {
        id: 128,
        title: "TESTROL PLATINUM",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$39.30",
        originalPrice: "",
        image: "128.jpg",
        specifications: [
            "PREMIUM TESTOSTERONE BOOSTER",
            "SUPPORTS LIBIDO & SEXUAL FUNCTION ",
            "INCREASED STAMINA & PERFORMANCE + SUPPORT HEALTHY",
            "TESTOSTERONE SYNTHESIS",
            "60 TABLETS",
            
        ],
        featured: false
    },
    {
        id: 129,
        title: "TESTROL PROSTATE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$39.50",
        originalPrice: "",
        image: "129.jpg",
        specifications: [
            "HIGH POTENCY FORMULA",
            "PROMOTES BLADDER & URINARY TRACT HEALTH",
            "MAY SUPPORT HEALTHY PROSTATE",
            "COMPREHENSIVE HERB & MINERAL FORMULA ",
            "90 CAPSULES"
        ],
        featured: false
    },
    {
        id: 130,
        title: "NITRAFLEX",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$36.10",
        originalPrice: "",
        image: "130.jpg",
        specifications: [
            "HYPEREMIA & TESTOSTERONE ENHANCING POWDER",
            "HIGHLY CONCENTRATED 3X STRENGTH ",
            "CLINICALLY-STUDIED CFB+VASOACTIVE COMPOUNDS",
            "30 SERVINGS FRUIT PUNCH",
        ],
        featured: false
    },
    {
        id: 131,
        title: "TESTROL ORIGINAL",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$34.60",
        originalPrice: "",
        image: "131.jpg",
        specifications: [
            "TESTOSTERONE BOOSTER ",
            "MUSCLE & MALE PERFORMANCE",
            "60 TABLETS",
        ],
        featured: false
    },
    {
        id: 132,
        title: "TESTROLE FIRE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$35.70",
        originalPrice: "",
        image: "132.jpg",
        specifications: [
            "TESTOSTERONE BOOSTER THERMOGENIC",
            "ENHANCE METABLIC RATE",
            "SUPPORTS LIBIDO AND SEXUAL FUNCTION",
            "IMPROVED BODY COMPOSITION AND PERFORMANCE",
           "60 CAPSULES",
        ],
        featured: false
    },
    {
        id: 133,
        title: "WHEY PROTEIN ",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$49.80",
        originalPrice: "",
        image: "133.jpg",
        specifications: [
            "ISOLATE BLEND MUSCLE PROTEIN SHAKE",
            "FAST ACTING 100%  WHEY PROTEIN ",
            "25 GRAMS PROTEIN ",
            "5 GRAMS CARBS ",
            "68 SERVINGS VANILLA"
        ],
        featured: false
    },
    
    
    
    
    
    
    
    
    
    {
        id: 38,
        title: "FLEXX EAAs",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$37.00",
        originalPrice: "",
        image: "s38.jpg",
        specifications: [
            "CALORIES 5",
            "CALCIUM 50 MG ",
            "MAGNESIUM 50 MG",
            "SODIUM 100 MG ",
            "FLEXX BCAA 6G"
        ],
        featured: false
    },
   {
        id:39,
        title: "Vitamin D3+K2",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$27.20",
        originalPrice: "",
        image: "s39.jpg",
        specifications: [
            "VITAMIN D3 125MCG",
            "VITAMIN K2 100MCG ",
            
        ],
        featured: false
    },

     {
        id: 40,
        title: "CREATINE MONOHYDRATE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$29.80",
        originalPrice: "",
        image: "s40.jpg",
        specifications: [
            "CREATINE 5 G",
            "MONOHYDRATE 5G",
            "CLINICALLY SHOWN TO IMPROVE MUSCLE STRENGTH",
            "PHOSPHOCREATINE / ATP SUPPORT ",
           
        ],
        featured: false
    },


     {
        id: 41,
        title: "Testrol Gold ES",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$37.60",
        originalPrice: "",
        image: "s41.jpg",
        specifications: [
            "VITAMIN B6 10MG",
            "FOLATE 500MCG",
            "VITAMIN B12 50MCG",
            "ZINC 15MG",
            "CELENIUM 50MCG "
        ],
        featured: false
    },



     {
        id: 42,
        title: "TRIBULUS",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$28.9",
        originalPrice: "",
        image: "s42.jpg",
        specifications: [
            "SERVING SIZE 1VEGETABLE ",
            "SERVING PER CONTAINER 90",
            "TRIBULUS FRUIT EXTRACT 750 MG",
            
        ],
        featured: false
    },


     {
        id: 43,
        title: "CAFFEINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$29.3",
        originalPrice: "",
        image: "s43.jpg",
        specifications: [
            "CALCIUM 75MG",
            "CAFFEINE ANHYDROUS 200MG",
            "BOOST ENERGY & ENDURANCE ",
            "FASTER REACTION TIME ",
        
        ],
        featured: false
    },


     {
        id: 45,
        title: "CREATINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$58.80",
        originalPrice: "",
        image: "s45.jpg",
        specifications: [
               "CREATINE 5 G",
            "MONOHYDRATE 5G",
            "CLINICALLY SHOWN TO IMPROVE MUSCLE STRENGTH",
            "PHOSPHOCREATINE / ATP SUPPORT ",
        ],
        featured: false
    },


     {
        id: 46,
        title: "L-CARNITINE",
        category: "GAT SPORT",
        description: "Ultra-premium protein matrix",
        price: "$33.7",
        originalPrice: "",
        image: "s46.jpg",
        specifications: [
            "HELPS CONVERT FOOD TO ENERGY",
            "FUELS FAT LOSS & SUPPORTS ENDURANCE ",
            "HELPS TO MAXIMIZE MUSCLE CARNITNE CONCENTATIONS ",
            "CARNITINE 500MG",
           
        ],
        featured: false
    },

    // ULTIMATE NUTRITION Products
    {
        id: 48,
        title: "Whey Gold",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$56.70",
        originalPrice: "",
        image: "s48.jpg",
        specifications: [
            "20 G PROTEIN ",
            "CHOLESTES 40MG ",
            "SODIUM 40MG",
            "SUGERS 2G",
            "TOTAL CARBOHYDRATES 9G"
        ],
        featured: false
    },


    

     {
        id: 50,
        title: "ISO ",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$66.80",
        originalPrice: "",
        image: "s50.jpg",
        specifications: [
            "PROTEIN 30 G ",
            "SODIUM 50 MG ",
            "SUGERS 1G",
            "GCHOLESTEROL 2MG",
            "CARBOHYDRATE 1G"
        ],
        featured: false
    },

     {
        id: 51,
        title: "L-Carnitine",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$27.20",
        originalPrice: "",
        image: "s51.jpg",
        specifications: [
            "L-Carnitine 1000MG",
            "SERVING SIZE 1 TABLETS",
            "SERVING PER CONTAINER 30 ",
            "300MG ",
            "60 TABLETS"
        ],
        featured: false
    },

     {
        id: 52,
        title: "ZMA",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$29.30",
        originalPrice: "",
        image: "s52.jpg",
        specifications: [
            "VITAMIN B6 10MG",
            "ZINC 30MG",
            "MAGNESIUM 450MG",
            "90 CAPSULES ",
    
        ],
        featured: false
    },



     {
        id: 53,
        title: "OMEGA 3",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$27.80",
        originalPrice: "",
        image: "s53.jpg",
        specifications: [
            "CALORIES 10 ",
            "TOTAL FAT 1G ",
            "EPA 180MG ",
            "DHA 120MG ",
            "OTHER OMEGA-3 FATTY ACIDS 30MG"
        ],
        featured: false
    },


     {
        id: 54,
        title: "XTREME AMINO",
        category: "ULTIMATE NUTRITION",
        description: "World's best-selling pre-workout",
        price: "$41.80",
        originalPrice: "",
        image: "s54.jpg",
        specifications: [
            "330 TABLETS ",
            "PROTEIN 4.5G",
            "CALORIES 18",
           
        ],
        featured: false
    },




     

    // JYM Supplement Science Products
    {
        id: 56,
        title: "HYPERBOLIC GH MASS",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$80.60",
        originalPrice: "",
        image: "s56.jpg",
        specifications: [
            "222G CARBS",
            "7.5G CREATINE ",
            "46G PROTINE",
            "1183 KCAL ",
         
        ],
        featured: false
    },
     {
        id: 57,
        title: "HYPERBOLIC MASS",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$77.90",
        originalPrice: "",
        image: "s57.jpg",
        specifications: [
            "210 G CAPRBS ",
            "8G CREABOLIC STACK",
            "4833 KJ",
            "60 G PROTEIN",
            
        ],
        featured: false
    },

    
      {
        id: 59,
        title: "Collagen",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$41.60",
        originalPrice: "",
        image: "s59.jpg",
        specifications: [
            "5G PROTEIN",
            "5G COLLAGEN ",
            "0 SUGAR",
        ],
        featured: false
    },

      {
        id: 60,
        title: "BCAA AMINO",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s60.jpg",
        specifications: [
            "Pre-workout",
            "Increase oxygen delivery to the muscles",
            "Caffeine & B12 for energy and clarity",
            "A refreshing BCAA drink with added caffeine and taurine to support performance and energy levels.",
          
        ],
        featured: false
    },

      {
        id: 61,
        title: "ZINC ",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s61.jpg",
        specifications: [
            " One-a-day,high potency 25mg zinc",
            "Contributes to normal immune function",
            "Coated tablets,easy to swallow",
           
        ],
        featured: false
    },


      {
        id: 62,
        title: "AMINO",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s62.jpg",
        specifications: [
            "Maintains Hydration",
            "Boosts stamina for training",
            "Helps to recover faster",
            "4.8 G BCAAS",
        ],
        featured: false
    },



      {
        id: 63,
        title:"ANABOLIC MASS",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s63.jpg",
        specifications: [
            "54G PROTEIN ",
            "5 G CERATINE",
            "850 MG HMB ",
            "Builds lean muscle mass",
            "Enhances physical performance and speeds recovery"
        ],
        featured: false
    },


      {
        id: 64,
        title: "CLA ",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s64.jpg",
        specifications: [
            "Boosts weight loss",
            "Powerful antioxidant",
            "Supports the immune system",
            "600MG GREAN TEA ",
            "POLYPHENOLS"
        ],
        featured: false
    },

      {
        id: 65,
        title: "MULTI-VITAMIN",
        category: "USN",
        description: "Scientifically formulated pre-workout",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s65.jpg",
        specifications: [
            "One capsule covers 100% of the daily requirement of essential vitamins",
            "For a healthy immune system",
            "Optimized with free radical scavengers",
            "Activates the energy metabolism",
          
        ],
        featured: false
    },

    // RSP Products
    {
        id: 68,
        title: "  Protein MASS TECH EXTREME  ",
        category: "MUSCLETECH",
        description: "Complete protein and superfood blend",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "s68.jpg",
        specifications: [
            "5 CREATINE ",
            "60 G PROTEIN ",
            "2,130 CALORIES ",
           
        ],
        featured:false
    },
    {
        id: 69,
        title: " CREATINE CELL TECH ",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s69.jpg",
        specifications: [
            "200 MG ALPHA LIPOIC ACID ",
            "10 G CREATINE ",
            "75G CARBOHYDRATES",
            "0 sugar, low calorie",
           
        ],
        featured: false
    },



    {
        id: 70,
        title: " ISO ",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s70.jpg",
        specifications: [
            "25G PROTINE",
            "BCAA 11,2 G",
            
            "0 sugar",
          
        ],
        featured: false
    },


    {
        id: 71,
        title: " 100% CREATINE",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s71.jpg",
        specifications: [
            "ENHANCED MUSCLE RECOVERY ",
            "IMMUNE SYSTEM SUPPORT",
            "HPLC-TESTED FOR UITRA PURITY ",
            "5G CREATINE ",
           
        ],
        featured: false
    },



    {
        id: 72,
        title: " NITRO TECH PROTINE ",
        category: "MUSCLETECH",
        description: "Fat burner with amino acids",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "s72.jpg",
        specifications: [
            "30 G PROTINE ",
            "5G CRATINE ",
            "1,5G BCAA",
        ],
        featured: false
    },



   

    // BPI Sports Products
  
     {
        id: 76,
        title: "BCAA TROPLCAL PUNCH ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "76.jpg",
        specifications: [
            "4.4 BCAA ",
            "0 SUGARS ",
            "2:1:1 BCAA RATIO ",
            "5 CALORIES ",
           
        ],
        featured: false
    },
     {
        id: 77,
        title: "KING MASS",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "77.jpg",
        specifications: [
            "187 G CARB MATRIX",
            "60G  PROTEIN ",
            "3G CREATINE ",
            "Gluten-free",
            "6 G OF HEALTHY FATS "
        ],
        featured: false
    },
     
   
     {
        id: 80,
        title: "Glutamine XS Unflavored Powder",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "80.jpg",
        specifications: [
            "5G PURE GLUTAMINE ",
            "0 DYES ",
            "0 ADDED FILLERS ",
            "0 ADDED FLAVORING ",
       
        ],
        featured: false
    },
     {
        id: 81,
        title: "AMINO ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "81.jpg",
        specifications: [
            "10 G ESSENTIAL AMINO ACIDS ",
            "5G INSTANTIZED AMINO ACIDS ",
            "3G FAT LOSS SUPPORT COMPLEX ",
            "2.7 G HYDRATION COMPLEX",
                   ],
        featured: false
    },
     {
        id: 82,
        title: "CREATINE ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "82.jpg",
        specifications: [
            "5G PER SCOOP ",
            "0 CARBS ",
            "0 CALORIES ",
            "100% PURE CREATINE ",
          
        ],
        featured: false
    },
     {
        id: 83,
        title: "KING WHEY ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "84.jpg",
        specifications: [
            "High Quality Whey Protein – Contains 23G of protein per scoop ",
            "Cost Effective – Whey XS was built to deliver a high quality protein powder that doesn’t require financing to buy it",
            "Premium Flavor – Despite King Whey Sport being an affordable whey protein powder we still used our most premium flavoring system",
            
        ],
        featured: false
    },
     {
        id: 84,
        title: "KING WHEY",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "85.jpg",
        specifications: [
            "PROTEIN 23G ",
            "CALCIUM 124 MG ",
            "IRON 1 MG ",
            "POTASSIUM 318 MG ",
          
        ],
        featured: false
    },
     {
        id: 85,
        title: " BCAA ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "86.jpg",
        specifications: [
            "4.4 G BCAA ",
            "0 SUGARS ",
            "2:1:1 BCAA RATIO ",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
    
     {
        id: 87,
        title: "L-CARNITINE ",
        category: "RONNIE COLEMAN",
        description: "Multi-source protein blend",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "87.jpg",
        specifications: [
            "24g premium protein blend",
            "Excellent taste profile",
            "Easy mixing formula",
            "Gluten-free",
            "28 servings per container"
        ],
        featured: false
    },
     

    {
        id: 96,
        title: "Asylum Cabinet Creatine",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "96.jpg",
        specifications: [
            "5G PURE CREATINE",
            "SUPPORTS INCREASES IN ENERGY, ENDURANCE & RECOVERY",
            "MAXIMUM POTENCY supports muscle size, strength, and power",
            "SUPREME ABSORBENCY micronized to get the most out of each dose",
            "UNFLAVORED can be mixed in your favorite beverage with ease"
        ],
        featured: false
    },
     {
        id: 97,
        title: "D-Aspartic Acid",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "97.jpg",
        specifications: [
            "Promotes Sexual Health",
            "Supports Brain Function",
            "Stack DAA with 28 Days Later for the ultimate testosterone boosting supplement",
            "D-Aspartic Acid 3G ",
           
        ],
        featured: false
    },
     {
        id: 98,
        title: " HMB",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "98.jpg",
        specifications: [
            "Builds Lean Muscle Mass",
            "Improves Aerobic Exercise Performance",
            "Supports Muscle Recovery",
            "CALCIUM 181 MG",
          
        ],
        featured: false
    },
     {
        id: 99,
        title: "Psychotic Test",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "99.jpg",
        specifications: [
            "PUMP & ENDURANCE MATRIX 3.8G",
            "TESTOSTERONE MATRIX 3.8G",
            "ENERGY & FOCUS MATRIX 502MG ",
           
        ],
        featured: false
    },
     {
        id: 100,
        title: "Psychotic",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "100.jpg",
        specifications: [
            "Highly branched cyclic dextrin",
            "Fast carbohydrate absorption",
            "Supports endurance",
            "Easy on stomach",
            "30 servings per container"
        ],
        featured: false
    },
    
      {
        id: 101,
        title: "L-Citrulline",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "101.jpg",
        specifications: [
            "Increases Muscle Pumps",
            "Promotes Recovery",
            "Increases GH Production",
            "L-Citrulline",
        ],
        featured: false
    },
     {
        id: 102,
        title: "Tribulus Capsules",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "102.jpg",
        specifications: [
             "750 MG of Tribulus Terrestris Extract per capsule",
            "Each capsule is one (1) serving",
            "Manufactured in a GMP Certified & FDA Registered",
          
        ],
        featured: false
    },
   

     {
        id: 104,
        title: "Premium Whey",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "104.jpg",
        specifications: [
         "PROTEIN 25G",
            "CALCIYM 121MG ",
            "PHOSPHORUS 60 G ",
        " SUGER 1G",
        
        ],
        featured: false
    },
     {
        id: 105,
        title: "Insane Cutz",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "105.jpg",
        specifications: [
      "Insane Cutz 666 MG",
            "BURN BODY FAT - Insane Cutz",
            " PATENTED ENERGY BOOSTER",
            "STRONGEST FAT BURNER MONEY CAN BUY",
        
        ],
        featured: false
    },
     {
        id: 106,
        title: "Insane Cutz",
        category: "INSANE LABZ",
        description: "Intra-workout carbohydrate formula",
        price: "$44.99",
        originalPrice: "$49.99",
        image: "106.jpg",
        specifications: [
            "Insane Cutz 666 MG",
            "BURN BODY FAT - Insane Cutz",
            " PATENTED ENERGY BOOSTER",
            "STRONGEST FAT BURNER MONEY CAN BUY",
           
        ],
        featured: false
    },
  

    // REDCON1 Products
    {
        id: 108,
        title: "HIT EAA Amino Acid Complex",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "108.jpg",
        specifications: [
            "Promotes muscle growth and repair, increased strength and maximised recovery",
            "Specifically designed to reduce tiredness and fatigue",
            "Contributes to normal protein and glycogen metabolism",
            "1200MG VITAMIN B6",
            "2123MG BCAASr"
        ],
        featured: false
    },
     {
        id: 109,
        title: " Shadowhey ISOLATE",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "109.jpg",
        specifications: [
            "PROTINE 26G ",
            "FAT 2.83 G",
            "CARBOHYDRATES 0.94G",
            "SALT 0.6G ",
         
        ],
        featured: false
    },
     {
        id: 110,
        title: "Game Changer Mass",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "110.jpg",
        specifications: [
            "64 G PROTEIN ",
            "128 CARBOHYDRATES ",
            "5 G CREATINE ",
       
        ],
        featured: false
    },
     {
        id: 111,
        title: "HIT BCAA 4:1:1",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "111.jpg",
        specifications: [
            "L-Glutamine Monohydrate 5000 MG ",
            "L-Leucine 5000 MG ",
            "L-Isoleucine 1250 MG ",
            "L-Valine 1250 MG ",
            
        ],
        featured: false
    },
     {
        id: 112,
        title: "HIT BCAA 10:1:1",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "112.jpg",
        specifications: [
            "12000 mg BCAA",
            "3000 mg Citrulline",
            "2000 mg Beta-Alanine",
            "Caffeine Free & Sugar-Free",
           
        ],
        featured: false
    },
     {
        id: 113,
        title: "Blood & Guts PreWorkout",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "113.jpg",
        specifications: [
            "Caffeine 350 MG ",
            "Citrulline Malate 6000 MG ",
            "Beta-alanine 5500 MG ",
            "Arginine AKG 4000MG ",
     
        ],
        featured: false
    },
     {
        id: 114,
        title: "Shadowhey Hydrolyzed",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "114.jpg",
        specifications: [
            "4.9g of BCAAs per servings",
            "0.61g of carbohydrates per serving",
            "0.51g of Fat and 0.57g of Sugars",
          
        ],
        featured: false
    },
     
     {
        id: 116,
        title: "Metabolic Mass Gainer ",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "116.jpg",
        specifications: [
            "Net Weight – 6000g",
            "Serving size – 2 scoops (150g)",
            "Servings per container – 40",
        
        ],
        featured: false
    },
     {
        id: 117,
        title: "OMEGA-3 Softgel",
        category: "DY NUTRITION",
        description: "Military-grade pre-workout",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "117.jpg",
        specifications: [
            "330mg EPA & 220mg DHA per serving",
            "Beneficial effect on the brain & vision",
            "Contributes to the normal function of the heart",
         
        ],
        featured: false
    },
    

    // KAGED MUSCLE Products
    {
        id: 45,
        title: "KAGED MUSCLE In-Kaged Pre-Workout",
        category: "kaged",
        description: "Clean, stimulant-based pre-workout",
        price: "$54.99",
        originalPrice: "$64.99",
        image: "s45.jpg",
        specifications: [
            "Sustained energy without crash",
            "Enhanced focus and endurance",
            "No artificial colors or dyes",
            "Third-party tested",
            "30 servings per container"
        ],
        featured: false
    },
    {
        id: 46,
        title: "KAGED MUSCLE Re-Kaged Protein",
        category: "kaged",
        description: "Ultra-clean protein powder",
        price: "$69.99",
        originalPrice: "$79.99",
        image: "s46.jpg",
        specifications: [
            "28g hydrolyzed protein",
            "Zero sugar and fat",
            "Fast absorption",
            "Excellent mixability",
            "20 servings per container"
        ],
        featured: false
    },
    {
        id: 47,
        title: "KAGED MUSCLE Creatine HCl",
        category: "kaged",
        description: "Highly soluble creatine",
        price: "$39.99",
        originalPrice: "$44.99",
        image: "s47.jpg",
        specifications: [
            "Creatine hydrochloride",
            "Increased solubility",
            "Reduced water retention",
            "Easy to mix",
            "120 servings per container"
        ],
        featured: false
    },

    // GHOST Products
    {
        id: 1000,
        title: "GHOST Whey Protein",
        category: "ghost",
        description: "Transparent label protein",
        price: "$59.99",
        originalPrice: "$69.99",
        image: "sss1.jpg",
        specifications: [
            "Fully disclosed label",
            "Great tasting flavors",
            "No proprietary blends",
            "Transparent ingredient list",
            "25 servings per container"
        ],
        featured: true
    },
    {
        id: 1000,
        title: "GHOST Legend Pre-Workout",
        category: "ghost",
        description: "Fully transparent pre-workout",
        price: "$49.99",
        originalPrice: "$59.99",
        image: "sss1.jpg",
        specifications: [
            "Fully disclosed formula",
            "No proprietary blends",
            "Great energy and focus",
            "Awesome flavor collaborations",
            "30 servings per container"
        ],
        featured: true
    },
    {
        id: 1000,
        title: "GHOST BCAA",
        category: "ghost",
        description: "Transparent BCAA formula",
        price: "$34.99",
        originalPrice: "$39.99",
        image: "sss1.jpg",
        specifications: [
            "4.5g BCAA per serving",
            "Fully transparent label",
            "Great tasting flavors",
            "No artificial colors",
            "30 servings per container"
        ],
        featured: true
    }
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const featuredSwiperWrapper = document.querySelector('.featuredSwiper .swiper-wrapper');
const modal = document.querySelector('.product-modal');
const closeModal = document.querySelector('.close-modal');
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
const dropdowns = document.querySelectorAll('.dropdown');

// Category Translations - Now showing brand names
const categoryTranslations = {
    protein: "OPTIMUM NUTRION",
    creatine: "NUTREX RESEARCH",
    energy: "ANIMAL",
    amino: "DYMATIZ",
    muscletech: "EXTRIFIT",
    bsn: "GAT SPORT",
    cellucor: "ULTIMATE NUTRITION",
    gnc: "USN",
    jym: "MUSCLETECH",
    rsp: "RONNIE COLEMAN",
    bpi: "INSANE LABZ",
    evogen: "DY NUTRITION",
    redcon: "REDCON1",
    kaged: "KAGED MUSCLE",
    ghost: "GHOST"
};

// Swiper instances
let featuredSwiper = null;
let categorySwiper = null;

// Initialize Swipers
function initSwipers() {
    // Featured Products Swiper
    if (document.querySelector('.featuredSwiper')) {
        featuredSwiper = new Swiper('.featuredSwiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            },
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
        });
    }
    
    // Category Swiper
    if (document.querySelector('.categorySwiper')) {
        categorySwiper = new Swiper('.categorySwiper', {
            slidesPerView: 2,
            spaceBetween: 15,
            navigation: {
                nextEl: '.cat-next',
                prevEl: '.cat-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 20,
                }
            },
            centeredSlides: false,
            observer: true,
            observeParents: true,
        });
    }
}

// Display Featured Products in Slider
function displayFeaturedProducts() {
    if (!featuredSwiperWrapper) return;
    
    featuredSwiperWrapper.innerHTML = '';
    
    const featuredProducts = products.filter(product => product.featured);
    
    if (featuredProducts.length === 0) {
        featuredSwiperWrapper.innerHTML = '<div class="no-featured">No featured products available</div>';
        return;
    }
    
    featuredProducts.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <button class="view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        
        featuredSwiperWrapper.appendChild(slide);
    });
    
    // Update Swiper if it exists
    if (featuredSwiper) {
        featuredSwiper.update();
    }
    
    // Add event listeners to view details buttons in slider
    document.querySelectorAll('.featured-slider .view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
}

// Display Products in Grid
function displayProducts(category = 'all') {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found in this category</div>';
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <button class="view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        // Animate each product card
        setTimeout(() => {
            productCard.style.transition = 'all 0.4s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 80);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
}

// Filter Products by Category (Brand)
function filterProducts(category) {
    // Remove active class from all slides
    document.querySelectorAll('.category-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active class to the appropriate slide
    const activeSlide = document.querySelector(`.category-slide[data-category="${category}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
        
        // Move swiper to active slide
        if (categorySwiper) {
            const slideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
            categorySwiper.slideTo(slideIndex);
        }
    }
    
    // Display filtered products
    displayProducts(category);
}

// Open Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Fill product data in modal
    const modalImg = document.getElementById('modal-product-img');
    const modalTitle = document.getElementById('modal-product-title');
    const modalCategory = document.getElementById('modal-product-category');
    const modalPrice = document.getElementById('modal-product-price');
    const modalOriginalPrice = document.getElementById('modal-product-original-price');
    const modalSpecs = document.getElementById('modal-product-specs');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (!modalImg || !modalTitle || !modalCategory || !modalPrice || !modalSpecs || !whatsappBtn) {
        console.error('Modal elements not found');
        return;
    }
    
    modalImg.src = product.image;
    modalImg.alt = product.title;
    modalTitle.textContent = product.title;
    modalCategory.textContent = categoryTranslations[product.category] || product.category;
    modalCategory.className = 'product-category';
    
    // Original price
    if (product.originalPrice) {
        modalOriginalPrice.textContent = product.originalPrice;
        modalOriginalPrice.style.display = 'inline';
    } else {
        modalOriginalPrice.style.display = 'none';
    }
    
    // Price
    modalPrice.textContent = product.price;
    
    // Specifications
    modalSpecs.innerHTML = '';
    product.specifications.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });
    
    // Update WhatsApp link
    const productName = encodeURIComponent(product.title);
    const price = encodeURIComponent(product.price);
    whatsappBtn.href = `https://wa.me/14072054399?text=I'm%20interested%20in%20${productName}%20(${price})`;
    
    // Show modal with animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

// Close Product Modal
function closeProductModal() {
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Mobile Menu Toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
}

// Mobile Dropdowns
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    if (link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeProductModal();
    }
});

// Close modal with close button
closeModal.addEventListener('click', closeProductModal);

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            // Close dropdowns on mobile
            if (window.innerWidth <= 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-toggle')) {
        navList.classList.remove('active');
    }
});

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swipers
    initSwipers();
    
    // Display featured products in slider
    displayFeaturedProducts();
    
    // Display all products in grid
    displayProducts();
    
    // Add event listeners for category slides
    document.querySelectorAll('.category-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Touch events for better mobile experience
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    console.log('AMZON Premium Supplements website loaded successfully');
});






























// ==========================================
// تفعيل القائمة المنسدلة - عرض الشركات عند الضغط
// ==========================================

// قائمة الشركات (نفس الموجودة في الـ HTML)
const dropdownCompaniesList = [
    "OPTIMUM NUTRION",
    "NUTREX RESEARCH", 
    "ANIMAL",
    "DYMATIZ",
    "EXTRIFIT",
    "GAT SPORT",
    "ULTIMATE NUTRITION",
    "USN",
    "MUSCLETECH",
    "RONNIE COLEMAN",
    "INSANE LABZ",
    "DY NUTRITION",
    "REDCON1",
    "KAGED MUSCLE",
    "GHOST"
];

// الحصول على القائمة المنسدلة
const dropdownMenuItems = document.querySelectorAll('.dropdown-menu li a');

// ربط الأحداث لكل شركة في القائمة المنسدلة
dropdownMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // الحصول على اسم الشركة من النص
        const companyName = this.textContent;
        
        // البحث عن الفئة (category) المناسبة للشركة
        let targetCategory = 'all';
        
        if (companyName === "OPTIMUM NUTRION") targetCategory = "protein";
        else if (companyName === "NUTREX RESEARCH") targetCategory = "creatine";
        else if (companyName === "ANIMAL") targetCategory = "energy";
        else if (companyName === "DYMATIZ") targetCategory = "amino";
        else if (companyName === "EXTRIFIT") targetCategory = "EXTRIFIT";
        else if (companyName === "GAT SPORT") targetCategory = "GAT SPORT";
        else if (companyName === "ULTIMATE NUTRITION") targetCategory = "ULTIMATE NUTRITION";
        else if (companyName === "USN") targetCategory = "USN";
        else if (companyName === "MUSCLETECH") targetCategory = "MUSCLETECH";
        else if (companyName === "RONNIE COLEMAN") targetCategory = "RONNIE COLEMAN";
        else if (companyName === "INSANE LABZ") targetCategory = "INSANE LABZ";
        else if (companyName === "DY NUTRITION") targetCategory = "DY NUTRITION";
        else if (companyName === "REDCON1") targetCategory = "redcon";
        else if (companyName === "KAGED MUSCLE") targetCategory = "kaged";
        else if (companyName === "GHOST") targetCategory = "ghost";
        
        // تصفية وعرض المنتجات حسب الشركة
        const filteredProducts = products.filter(p => p.category === targetCategory);
        displayProductsGrid(filteredProducts);
        
        // التمرير إلى قسم المنتجات
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        
        // إغلاق القائمة في الموبايل
        if (navList) navList.classList.remove('active');
    });
});

// دالة عرض المنتجات (إذا لم تكن موجودة)
function displayProductsGrid(productsArray) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsArray.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found for this company</div>';
        return;
    }
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='sss1.jpg'">
            </div>
            <div class="product-info">
                <span class="product-category">${categoryTranslations[product.category] || product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <button class="view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // إعادة ربط أزرار التفاصيل
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (typeof openProductModal === 'function') {
                openProductModal(id);
            }
        });
    });
}

console.log('✅ Dropdown menu activated with ' + dropdownCompaniesList.length + ' companies');
