<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-footer color="footer" class="d-flex flex-column footer">
    <div class="mx-auto d-flex flex-column align-center mt-5">
      <div class="footer-logo DMSans mb-10">
        <v-img :src="require(`@/assets/home/footer-logo.webp`)"></v-img>
      </div>
      <div class="d-flex policy mx-auto">
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize black--text font-weight-bold">
            Credit Card
          </div>
          <div class="text-none text-capitalize black--text">Youth Card</div>
          <div class="text-none text-capitalize black--text">Black Card</div>
          <div class="text-none text-capitalize black--text">Platinum Card</div>
          <div class="text-none text-capitalize black--text">World Card</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize black--text font-weight-bold">
            Loan
          </div>
          <div class="text-none text-capitalize black--text">Overview</div>
          <div class="text-none text-capitalize black--text">
            Conditions & Fees
          </div>
          <div class="text-none text-capitalize black--text">Car Loan</div>
          <div class="text-none text-capitalize black--text">Home Loan</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize black--text font-weight-bold">
            Savings Account
          </div>
          <div class="text-none text-capitalize black--text">
            Regular Saving
          </div>
          <div class="text-none text-capitalize black--text">Easy Saving</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize black--text font-weight-bold">
            Products
          </div>
          <div class="text-none text-capitalize black--text">Account</div>
          <div class="text-none text-capitalize black--text">
            Internet Banking
          </div>
          <div class="text-none text-capitalize black--text">AIA Insurance</div>
          <div class="text-none text-capitalize black--text">NeoBank</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize black--text font-weight-bold">
            Others
          </div>
          <div class="text-none text-capitalize black--text">Promotions</div>
          <div class="text-none text-capitalize black--text">
            Documents & Fees
          </div>
          <div class="text-none text-capitalize black--text">
            Tools & Utility
          </div>
          <div class="text-none text-capitalize black--text">FAQs</div>
        </div>
      </div>
    </div>
    <div class="footer-des d-flex flex-column align-center justify-center mt-4">
      <div class="text-none text-capitalize white--text">
        © 2023. NeoBank Project. Portions Copyright © All rights reserved. Site
        design by CapyLabs
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  font-size: 14px;
  height: 400px;
  width: 100%;
  @media (max-width: 1280px) {
    height: max-content;
  }
}
.footer-logo {
  height: 38px;
  width: 158px;
}
.group {
  row-gap: 11px;
}

.footer-des {
  height: 96px;
  width: 100%;
  background: #544fdb;
}
.policy {
  column-gap: 100px;

  @media (max-width: 1280px) {
    width: 60%;
    column-gap: 30px;
    flex-wrap: wrap;
    row-gap: 15px;
  }
}
</style>
