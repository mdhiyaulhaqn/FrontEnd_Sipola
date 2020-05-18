<template>
    <b-row class="items_row">
        <span class="col-md-4 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
            <label class="label">Item</label>
        </span>
        <div class="col-md-4 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="name"
                v-model="purchasedItem.name"
                type="text"
                required
                placeholder="Item Name"
                pattern=".*[a-zA-Z0-9-].*"
            ></b-form-input>
        </div>

        <span class="col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
            <label class="label">Quantity</label>
        </span>
        <div class="col-md-2 col-sm-8 col-xs-8 col-7">
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

        <span class="col-md-2 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
            <label class="label">UOM</label>
        </span>
        <div class="col-md-2 col-sm-8 col-xs-8 col-7">
            <b-form-input
                id="unitOfMeasurement"
                v-model="purchasedItem.unitOfMeasurement"
                type="text"
                required
                placeholder="UOM"
                pattern="[a-zA-Z\s]+"
            >
            </b-form-input>
        </div>

        <span class="col-md-3 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none required">
            <label class="label">Unit Price (IDR)</label>
        </span>
        <div class="col-md-3 col-sm-8 col-xs-8 col-7 text-center">
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

        <span class="col-md-1 col-sm-4 col-xs-4 col-5 d-block d-xs-block d-sm-block d-md-none"></span>
        <div class="col-md-1 col-sm-8 col-xs-8 col-7">
            <b-button @click="$emit('delete-item', purchasedItem.id_purchased_item)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
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
    margin: auto;
}
#delete-button{
    width: 100%;
}
.label{
  font-weight: 600;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
