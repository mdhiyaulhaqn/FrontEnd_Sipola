<template>

    <b-row class="attachment-row">
        <b-form-input
            id="image"
            v-model="attachment.image"
            type="file"
            placeholder="Drop your files here"
            >
        </b-form-input>
    </b-row>
    
</template>


<style>
    .attachment-row input {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>