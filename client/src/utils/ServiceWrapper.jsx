import axios from "axios";
import { toast } from "react-toastify";

/**
 * Uses axios - method, url, event listeners, etc. are passed into the options
 * param as an object.
 * @name ServiceWrapper
 * @param {{}} options
 * @return {Promise}
 */
const ServiceWrapper = (options) => {
    return new Promise((resolve, reject) => {
        axios(options)
            .then((response) => {
                if (ServiceWrapper.checkStatus(response)) {
                    resolve(response);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/**
 * Do we have a workable status? If not, throw an error with the status text
 * @name checkStatus
 * @static
 * @param {{}} response
 * @return {{}} response
 * @throws {Error} error
 */
ServiceWrapper.checkStatus = (response) => {
    // Success status is any 200s response
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response);
};

/**
 * Detect the type of error and return the appropriate message
 * @name errorHandler
 * @static
 * @param {{}|string|null} error
 * @return {string|*}
 */
ServiceWrapper.errorHandler = (error) => {
    const { exception, message, path, status } = error;
    const eErr = error.error ? error.error : "";
    const eExc = exception ? `\n${exception}` : "";
    const eMess = message ? `\n${message}` : "";
    const ePath = path ? `\n${path}` : "";
    if (status) {
        return `${status} - ${eErr} ${eExc} ${eMess} ${ePath}`;
    }
    if (message) {
        return message;
    }

    return error;
};

/**
 * Convert response headers into an array
 * @name responseHeadersAsArray
 * @static
 * @param {{}} response
 * @return {[]} headers
 */
ServiceWrapper.responseHeadersAsArray = (response) => {
    const headers = {};
    const keyValues = [...response.headers.entries()];
    keyValues.forEach(([key, val]) => {
        headers[key] = val;
    });

    return headers;
};

/**
 * Perform CRUD operations with an API
 * @name serviceCall
 * @static
 * @param {{}} options
 * @param {bool} retrieveAllFlag
 * @param {func} setLoader
 * @param {func} setResults
 * @param {string} subject
 * @return {*}
 */
ServiceWrapper.serviceCall = ({
    options,
    retrieveAllFlag,
    setLoader,
    setResults,
    subject
}) => {
    let action = "update";
    switch (options.method) {
        case "DELETE":
            action = "delete";
            break;
        case "POST":
            action = "create";
            break;
        case "PUT":
            action = "update";
            break;
        default:
            // method = GET
            action = "retrieve";
            break;
    }

    return ServiceWrapper(options)
        .then((response) => {
            if (setResults) {
                const { payload } = response.data;
                if (Array.isArray(payload) && !retrieveAllFlag) {
                    setResults(payload[0]);
                } else {
                    setResults(payload);
                }
            }
            if (setLoader) {
                setLoader(false);
            }
            if (subject) {
                toast.success(`Successfully ${action}d the ${subject}`);
            }

            return response;
        })
        .catch((error) => {
            toast.error(ServiceWrapper.errorHandler(error));
        });
};

export default ServiceWrapper;
