const { createVNode } = Vue
const productDetails = {
    
    template: 
    /*html*/
    `
        <div class="product-details">
        <ul>
          <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
        </ul>
        </div>
    `,
    props: {
        details: {
            type: Array,
            required: true
        }
    }
}
