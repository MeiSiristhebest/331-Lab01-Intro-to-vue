const productDisplay = {

    template:
        /*html*/
        `
       <div class="product-display">
               <div class="product-container">
                   <div class="product-image">
                   <img :src="image" :class="{'out-of-stock-image':!inStock}" alt="product-image">
                   </div>
               </div>
               <div class="product-info">
               <a :href="productUrl" class="no-style-link" target="_blank">
               <h1>{{ title }}</h1>
           </a>
           <p>{{ stockMessage }}</p>
                   <p v-if="onSale">{{isOnSale}}</p>
                   <p v-else>This product is not on sale</p>
                   <p>Shipping: {{shipping}}</p>
                   <product-details :details="details"></product-details>
                   <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                       class="color-circle" :style="{backgroundColor: variant.color}">
      
                   </div>
                   <select v-model="selectedSize">
                       <option v-for="productSize in productSizes" :key="productSize.id" :value="productSize.size">
                        {{ productSize.size }}
                        </option>
                    </select>
                    <div class="buttons">
                    <button class="button" :disabled="!inStock" @click="addToCart" :class="{ disabledButton: !inStock }">Add To Cart</button>
                    <button class="button" :disabled="!inCart" @click="rmoveCart" :class="{ disabledButton: !inCart }">Remove From Cart</button>
                    <button class="button" @click="toggleInStock">Change In Stock Status</button>
                    </div>
                </div>
               <review-list v-if="reviews.length" :reviews="reviews"></review-list>
               <review-form @review-submitted="addReview"></review-form>
           </div>
          
       `,

    props: {
        cart: Array,
        premium: Boolean
    },
    setup(props, { emit }) {
        const shipping = computed(() => {
            if (props.premium) {
                return 'Free'
            } else {
                return 30
            }

        })
        const reviews = ref([])
        const product = ref('Boots')
        const brand = ref('SE 331')
        const productUrl = 'http://www.camt.cmu.ac.th'
        const onSale = ref(true)
        const inventory = ref(100)
        const selectedSize = ref('S')
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 5 }
        ])
        const selectedVariant = ref(0)
        const productSizes = ref([
            { id: 1, size: 'S' },
            { id: 2, size: 'M' },
            { id: 3, size: 'L' },
        ])
        function updateVariant(index) {
            selectedVariant.value = index
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })

        const inCart = computed(() => {
            return !!props.cart.find(item => item.id === variants.value[selectedVariant.value].id)
        })

        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity > 0;
        });


        const stockMessage = computed(() => {
            const quantity = variants.value[selectedVariant.value].quantity;
            if (quantity > 10) {
                return 'In Stock';
            } else if (quantity <= 10 && quantity > 0) {
                return 'Almost out of Stock';
            } else {
                return 'Out of Stock';
            }
        });


        function updateVariant(index) {
            selectedVariant.value = index;
        }
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        function rmoveCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }
        const title = computed(() => {
            return brand.value + ' ' + product.value
        })
        const isOnSale = computed(() => {
            return brand.value + ' ' + product.value + ' ' + 'is on sale'
        })
        function updateImage(variantImage) {
            image.value = variantImage
        }
        function addReview(review) {
            console.log('Review submitted:', review)
            reviews.value.push(review)
        }
        const toggleInStock = () => {
            const currentVariant = variants.value[selectedVariant.value];
            currentVariant.quantity = currentVariant.quantity > 0 ? 0 : 50;
            emit('stock-status-changed', currentVariant.quantity > 0);
        }
        return {
            title,
            isOnSale,
            productUrl,
            onSale,
            image,
            inStock,
            inCart,
            inventory,
            selectedVariant,
            stockMessage,
            selectedSize,
            details,
            productSizes,
            variants,
            reviews,
            toggleInStock,
            addToCart,
            rmoveCart,
            updateImage,
            updateVariant,
            addReview,
            shipping
        }
    }
}
