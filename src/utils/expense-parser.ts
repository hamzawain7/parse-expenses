import {getFromBetween} from "./string-util";
import {VENDOR_NAME_HASHMAP, VENDOR_TYPE} from "./vendor-utils";

export interface PurchaseDetails {
    [key: string]: PurchaseDetail
}

interface PurchaseDetail {
    amount: number
    details: Array<string>
}

export const getTotalExpenseAmount = (text: string) => {
    let details = parseExpenseText(text),
        total = 0;
    for (let [, vendorTypePurchases] of Object.entries(details)) {
        total += vendorTypePurchases.amount;
    }
    return total;
}

export const parseExpenseText = (text: string) => {
    let purchaseDetails: PurchaseDetails = {
        [VENDOR_TYPE.misc]: {
            amount: 0,
            details: []
        },
    };

    const purchases = getFromBetween.get(text, "used for PKR ", ". Limit");
    for (const purchase of purchases) {
        let purchaseAmount = parseInt(purchase.split(" at ")[0].replace(',', ''));
        let purchaseVendor = purchase.split(" at ")[2];
        let misc = true;

        for (let [vendorName, vendorType] of Object.entries(VENDOR_NAME_HASHMAP)) {
            if (purchaseVendor.indexOf(vendorName) !== -1) {
                misc = false;
                if (purchaseDetails[vendorType] === undefined) {
                    purchaseDetails[vendorType] = {
                        amount: 0,
                        details: []
                    };
                }
                purchaseDetails[vendorType].amount += purchaseAmount;
                purchaseDetails[vendorType].details.push('Rs.' + purchaseAmount + ' at ' + purchaseVendor);
            }
        }

        if (misc) {
            purchaseDetails.misc.amount += purchaseAmount;
            purchaseDetails.misc.details.push('Rs.' + purchaseAmount + ' at ' + purchaseVendor);
        }
    }

    return purchaseDetails;
}
