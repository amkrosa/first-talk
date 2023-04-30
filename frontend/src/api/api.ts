/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CreateRoomRequest
 */
export interface CreateRoomRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateRoomRequest
     */
    'userId'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateRoomRequest
     */
    'name'?: string;
}
/**
 * 
 * @export
 * @interface CreateRoomResponse
 */
export interface CreateRoomResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateRoomResponse
     */
    'roomId'?: string;
}
/**
 * 
 * @export
 * @interface GetRoomsResponse
 */
export interface GetRoomsResponse {
    /**
     * 
     * @type {Array<RoomDto>}
     * @memberof GetRoomsResponse
     */
    'rooms'?: Array<RoomDto>;
}
/**
 * 
 * @export
 * @interface JoinRoomRequest
 */
export interface JoinRoomRequest {
    /**
     * 
     * @type {string}
     * @memberof JoinRoomRequest
     */
    'userId'?: string;
}
/**
 * 
 * @export
 * @interface JwtDto
 */
export interface JwtDto {
    /**
     * 
     * @type {string}
     * @memberof JwtDto
     */
    'jwt'?: string;
    /**
     * 
     * @type {string}
     * @memberof JwtDto
     */
    'expiration'?: string;
}
/**
 * 
 * @export
 * @interface ProblemDetail
 */
export interface ProblemDetail {
    /**
     * 
     * @type {string}
     * @memberof ProblemDetail
     */
    'type'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetail
     */
    'title'?: string;
    /**
     * 
     * @type {number}
     * @memberof ProblemDetail
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetail
     */
    'detail'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetail
     */
    'instance'?: string;
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof ProblemDetail
     */
    'properties'?: { [key: string]: object; };
}
/**
 * 
 * @export
 * @interface RoomDto
 */
export interface RoomDto {
    /**
     * 
     * @type {string}
     * @memberof RoomDto
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomDto
     */
    'roomId'?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomDto
     */
    'userCount'?: number;
}
/**
 * 
 * @export
 * @interface UserRequest
 */
export interface UserRequest {
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'type'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'password'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'email'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserRequest
     */
    'interests'?: Array<string>;
}
/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'name'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserResponse
     */
    'interests'?: Array<string>;
    /**
     * 
     * @type {JwtDto}
     * @memberof UserResponse
     */
    'auth'?: JwtDto;
}

/**
 * ChatRestControllerApi - axios parameter creator
 * @export
 */
export const ChatRestControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create room
         * @param {CreateRoomRequest} createRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRoom: async (createRoomRequest: CreateRoomRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createRoomRequest' is not null or undefined
            assertParamExists('createRoom', 'createRoomRequest', createRoomRequest)
            const localVarPath = `/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createRoomRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all available rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRooms: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Join room as a user
         * @param {string} roomId 
         * @param {JoinRoomRequest} joinRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        joinRoom: async (roomId: string, joinRoomRequest: JoinRoomRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('joinRoom', 'roomId', roomId)
            // verify required parameter 'joinRoomRequest' is not null or undefined
            assertParamExists('joinRoom', 'joinRoomRequest', joinRoomRequest)
            const localVarPath = `/rooms/{roomId}`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(joinRoomRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ChatRestControllerApi - functional programming interface
 * @export
 */
export const ChatRestControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ChatRestControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create room
         * @param {CreateRoomRequest} createRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRoom(createRoomRequest: CreateRoomRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateRoomResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRoom(createRoomRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get all available rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRooms(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetRoomsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRooms(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Join room as a user
         * @param {string} roomId 
         * @param {JoinRoomRequest} joinRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async joinRoom(roomId: string, joinRoomRequest: JoinRoomRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateRoomResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.joinRoom(roomId, joinRoomRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ChatRestControllerApi - factory interface
 * @export
 */
export const ChatRestControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ChatRestControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Create room
         * @param {CreateRoomRequest} createRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRoom(createRoomRequest: CreateRoomRequest, options?: any): AxiosPromise<CreateRoomResponse> {
            return localVarFp.createRoom(createRoomRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all available rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRooms(options?: any): AxiosPromise<GetRoomsResponse> {
            return localVarFp.getRooms(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Join room as a user
         * @param {string} roomId 
         * @param {JoinRoomRequest} joinRoomRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        joinRoom(roomId: string, joinRoomRequest: JoinRoomRequest, options?: any): AxiosPromise<CreateRoomResponse> {
            return localVarFp.joinRoom(roomId, joinRoomRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ChatRestControllerApi - object-oriented interface
 * @export
 * @class ChatRestControllerApi
 * @extends {BaseAPI}
 */
export class ChatRestControllerApi extends BaseAPI {
    /**
     * 
     * @summary Create room
     * @param {CreateRoomRequest} createRoomRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatRestControllerApi
     */
    public createRoom(createRoomRequest: CreateRoomRequest, options?: AxiosRequestConfig) {
        return ChatRestControllerApiFp(this.configuration).createRoom(createRoomRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all available rooms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatRestControllerApi
     */
    public getRooms(options?: AxiosRequestConfig) {
        return ChatRestControllerApiFp(this.configuration).getRooms(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Join room as a user
     * @param {string} roomId 
     * @param {JoinRoomRequest} joinRoomRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatRestControllerApi
     */
    public joinRoom(roomId: string, joinRoomRequest: JoinRoomRequest, options?: AxiosRequestConfig) {
        return ChatRestControllerApiFp(this.configuration).joinRoom(roomId, joinRoomRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UserRestControllerApi - axios parameter creator
 * @export
 */
export const UserRestControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create guest user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerGuestUser: async (userRequest: UserRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userRequest' is not null or undefined
            assertParamExists('registerGuestUser', 'userRequest', userRequest)
            const localVarPath = `/guest`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserRestControllerApi - functional programming interface
 * @export
 */
export const UserRestControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserRestControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create guest user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerGuestUser(userRequest: UserRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.registerGuestUser(userRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserRestControllerApi - factory interface
 * @export
 */
export const UserRestControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserRestControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary Create guest user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerGuestUser(userRequest: UserRequest, options?: any): AxiosPromise<UserResponse> {
            return localVarFp.registerGuestUser(userRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserRestControllerApi - object-oriented interface
 * @export
 * @class UserRestControllerApi
 * @extends {BaseAPI}
 */
export class UserRestControllerApi extends BaseAPI {
    /**
     * 
     * @summary Create guest user
     * @param {UserRequest} userRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserRestControllerApi
     */
    public registerGuestUser(userRequest: UserRequest, options?: AxiosRequestConfig) {
        return UserRestControllerApiFp(this.configuration).registerGuestUser(userRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

