const { createApp, ref, computed } = Vue

createApp({
    setup() {
        const product = ref('Boots')
        const brand = ref('SE 331')
        const productUrl = 'http://www.camt.cmu.ac.th'
        const inventory = ref(5)
        const onSale = ref(true)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        const productSizes = ref([
            { id: 1, size: 'S' },
            { id: 2, size: 'M' },
            { id: 3, size: 'L' },
        ])
        const cart = ref(0)
        function addToCart() {
            cart.value += 1
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
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        const toggleInStock = () => {
            const currentVariant = variants.value[selectedVariant.value];
            currentVariant.quantity = currentVariant.quantity > 0 ? 0 : 50;
        }
        return {
            product,
            brand,
            title,
            isOnSale,
            image,
            productUrl,
            inStock,
            inventory,
            onSale,
            details,
            variants,
            selectedVariant,
            productSizes,
            cart,
            addToCart,
            updateImage,
            toggleInStock,
            updateVariant

        }
    }

}).mount('#app')
