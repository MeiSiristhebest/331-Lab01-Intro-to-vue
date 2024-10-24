const reviewList = {

    template:
        /*html*/
        `
        <div class="review-container">
            <h3>Reviews:</h3>
            <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} gave this {{ review.rating }} stars
                <br/>
                "{{ review.review }}"
                <br/>
                Recommendation: {{ review.recommend }}
            </li>
            </ul>
        </div>
            `
    , props: {
        reviews: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const reviews = computed(() => props.reviews)
        return {
            reviews
        }
    }
}
