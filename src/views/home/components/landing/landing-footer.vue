<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column footer justify-space-between pb-10">
    <div class="mx-auto d-flex flex-column align-center mt-5">
      <div class="d-flex">
        <v-img
          class="footer-logo align-self-center"
          :src="require(`@/assets/landing-logo.webp`)"
        />
        <span class="ml-2 text-dp-xs font-weight-700 white--text"
          >VParadise</span
        >
      </div>
      <div class="d-flex policy mx-auto mt-8">
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize white--text font-weight-bold">
            Credit Card
          </div>
          <div class="text-none text-capitalize white--text">Youth Card</div>
          <div class="text-none text-capitalize white--text">Black Card</div>
          <div class="text-none text-capitalize white--text">Platinum Card</div>
          <div class="text-none text-capitalize white--text">World Card</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize white--text font-weight-bold">
            Loan
          </div>
          <div class="text-none text-capitalize white--text">Overview</div>
          <div class="text-none text-capitalize white--text">
            Conditions & Fees
          </div>
          <div class="text-none text-capitalize white--text">Car Loan</div>
          <div class="text-none text-capitalize white--text">Home Loan</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize white--text font-weight-bold">
            Savings Account
          </div>
          <div class="text-none text-capitalize white--text">
            Regular Saving
          </div>
          <div class="text-none text-capitalize white--text">Easy Saving</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize white--text font-weight-bold">
            Products
          </div>
          <div class="text-none text-capitalize white--text">Account</div>
          <div class="text-none text-capitalize white--text">
            Internet Banking
          </div>
          <div class="text-none text-capitalize white--text">AIA Insurance</div>
          <div class="text-none text-capitalize white--text">NeoBank</div>
        </div>
        <div class="d-flex flex-column text-left group">
          <div class="text-none text-capitalize white--text font-weight-bold">
            Others
          </div>
          <div class="text-none text-capitalize white--text">Promotions</div>
          <div class="text-none text-capitalize white--text">
            Documents & Fees
          </div>
          <div class="text-none text-capitalize white--text">
            Tools & Utility
          </div>
          <div class="text-none text-capitalize white--text">FAQs</div>
        </div>
      </div>
    </div>
    <div
      class="footer-des px-10 d-flex align-center justify-space-between mt-4"
    >
      <div class="text-none text-capitalize white--text">
        Site design by CapyLabs
      </div>
      <div class="text-none text-capitalize white--text">
        NeoBank Project © 2023. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  font-size: 14px;
  height: 360px;
  background-color: transparent !important;
  @media (max-width: 1280px) {
    height: max-content;
  }
}
.footer-logo {
  height: 36px;
  width: 36px;
}
.group {
  row-gap: 11px;
}

.footer-des {
  width: 100%;
  margin-top: 75px;
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
