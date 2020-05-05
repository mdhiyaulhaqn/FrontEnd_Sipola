<template>
    <b-row class="items_row">
        <span class = "col-md-5 col-sm-3 col-xs-3 col-4 d-block d-xs-block d-sm-block d-md-none">
            <label>Scope of Works</label>
        </span>

        <div class = "col-md-5 col-sm-7 col-xs-7 col-6">
            <b-form-input
                id="name"
                v-model="purchasedItem.name"
                type="text"
                required
                placeholder="Item Name"
                pattern="[a-zA-Z0-9-]++"
            ></b-form-input>
        </div>

        <span class = "col-md-2 col-sm-3 col-xs-3 col-4 d-block d-xs-block d-sm-block d-md-none">
            <label>Quantity</label>
        </span>
        <div class= "col-md-2 col-sm-7 col-xs-7 col-6">
                <b-form-input
                    id="quantity"
                    v-model="purchasedItem.quantity"
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                >
                </b-form-input>
        </div>

        <span class = "col-md-2 col-sm-3 col-xs-3 col-4 d-block d-xs-block d-sm-block d-md-none">
            <label>UOM</label>
        </span>
        <div class= "col-md-2 col-sm-7 col-xs-7 col-6">
                <b-form-input
                    id="uom"
                    v-model="purchasedItem.unitOfMeasurement"
                    type="text"
                    required
                    placeholder="Unit of Measurement"
                    pattern="[a-zA-Z\s]+"
                >
                </b-form-input>
        </div>

        <span class = "col-md-2 col-sm-3 col-xs-3 col-4 d-block d-xs-block d-sm-block d-md-none">
            <label>Unit Price (IDR) </label>
        </span>
        <div class= "col-md-2 col-sm-7 col-xs-7 col-6">
                <b-form-input
                    id="price"
                    v-model="purchasedItem.pricePerUnit"
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    lang = "id-ID"
                >
                </b-form-input>
        </div>

        <span class = "col-md-1 col-sm-3 col-xs-3 col-4 d-block d-xs-block d-sm-block d-md-none">
        </span>
        <div class = "col-md-1 col-sm-7 col-xs-7 col-6">
            <b-button id="delete-button" @click="$emit('delete-item', purchasedItem.id_purchased_item)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </div>
    </b-row>
</template>

<script>
export default {
    name: "PurchasedItem",
    props: ["purchasedItem"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
.items_row{
    margin:auto;
}
#delete-button{
    width: 100%;
}
</style>