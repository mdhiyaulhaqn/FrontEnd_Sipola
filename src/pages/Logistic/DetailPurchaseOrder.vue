<template>
    <div class="row">
        <div class="col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'purchase-order'}">
                    Purchase Order List
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Purchase Order
                </b-breadcrumb-item>
            </b-breadcrumb>

            <div class="judul">
                <strong>Detail Purchase Order</strong>
            </div>

            <card>
                <div class="container-fluid">
                    <b-row>
                        <div class="company-name">
                            <strong>{{ purchaseOrder.company.nama }}</strong>
                        </div>
                    </b-row>

                    <b-row>
                        <div class = "col-md-2 col-6">PO No</div>
                        <div class = "col-md-5 col-6">: {{ purchaseOrder.noPurchaseOrder }}</div>
                        <div class = "col-md-2 col-6">Cust. Ref. No</div>
                        <div class = "col-md-3 col-6">: {{ purchaseOrder.noCustRef }}</div>
                    </b-row>

                    <b-row>
                        <div class = "col-md-2 col-6">PO Date</div>
                        <div class = "col-md-5 col-6">: {{ purchaseOrder.datePurchaseOrder }}</div>
                        <div class = "col-md-2 col-6">Project No</div>
                        <div class = "col-md-3 col-6">: {{ purchaseOrder.noProject }}</div>
                    </b-row>

                    <b-row>
                        <div class = "col-md-2 col-6">Attn.</div>
                        <div class = "col-md-5 col-6">: {{ purchaseOrder.attnName }}</div>
                        <div class = "col-md-2 col-6">Created By</div>
                        <div class = "col-md-3 col-6">: {{ purchaseOrder.createdBy }}</div>
                    </b-row>

                    <b-row>
                        <div class = "col-md-2 col-6">Address</div>
                        <div class = "col-md-5 col-6">: {{ purchaseOrder.company.nama }}</div>
                        <div class = "col-md-2 col-6">Created At</div>
                        <div class = "col-md-3 col-6">: {{ purchaseOrder.createdAt }}</div>
                    </b-row>

                    <b-row>
                        <div class = "col-lg-6 col-sm-4 col-12"><br>
                            Purchased Items
                        </div>
                        <div class = "col-lg-6 col-sm-8 col-12">
                            <button  @click="downloadReport" id="download_button" class="btn btn-primary">
                                Download
                                <span class="ti-download"></span>
                            </button>
                        </div>
                    </b-row>    
                    <br>

                    <b-row>
                        <b-col >
                            <div class="tabel-service">
                                <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                    <b-table 
                                    :items="purchaseOrder.purchasedItems" 
                                    :fields="fields"
                                    >
                                        <template v-slot:cell(No)="row">
                                            {{invoice.salesOrder.service.indexOf(row.item) + 1}}
                                        </template>
                                        <template v-slot:cell(Total Price(IDR))="row">
                                            {{row.item.pricePerUnit}} * {{row.item.quantity}}
                                        </template>

                                        <!-- <template slot="FOOT_Value(IDR)">
                                            <td>Sub-total: {{invoice.sub_total_price}}</td>
                                            <br>
                                            <td>VAT Price: {{invoice.price_vat}}</td>
                                            <br>
                                            <td>Grand-total Price: {{invoice.grand_total_price}}</td>
                                        </template> -->
                                    </b-table>
                                    
                                </div>
                            </div>
                        </b-col>
                    </b-row>                                       
                </div>
            </card>
        </div>
    </div>
</template>